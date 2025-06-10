import * as datasets from "..";
import { promises as fs } from "fs";
import path from "path";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
const rl = readline.createInterface({ input, output });
import open from "open";
import { DatasetProfile } from "..";

async function readProfiles() {
  const folder = path.join(__dirname, "..", "..", "profiles");
  const res: Record<string, DatasetProfile> = {};
  const dsFolderNames = await fs.readdir(folder);
  for (const dsFN of dsFolderNames) {
    const fn = path.join(folder, dsFN, "dataset.json");
    try {
      await fs.access(fn);
    } catch (err) {
      continue; // Skip if file does not exist
    }
    try {
      console.log(`Reading dataset profile from ${fn}`);
      const data = await fs.readFile(fn, "utf-8");
      const profile: DatasetProfile = JSON.parse(data);
      res[profile.id] = profile;
    } catch (err) {
      console.error(`Error reading dataset profile ${fn}:`, err);
    }
  }

  return res;
}

async function main() {
  const datasets = await readProfiles();
  const dsArgs =
    process.argv.slice(2).reduce(
      (acc, arg) => {
        const [ds, part] = arg.split("#");
        if (!part) {
          acc[ds] = acc[ds] || { _all: true };
        } else {
          acc[ds] = acc[ds] || {};
          acc[ds][part] = true;
        }
        return acc;
      },
      {} as Record<string, Record<string, boolean>>
    ) || null;

  console.log("XXXXXXXXXXXx", { dsArgs });

  for (const ds of Object.values(datasets)) {
    if (!Object.keys(dsArgs).length || dsArgs[ds.id]) {
      console.log(`Downloading non-open files for dataset ${ds.id}`);
      if (ds.metadata.nonOpen?.files) {
        for (const file of ds.metadata.nonOpen.files) {
          if (
            dsArgs &&
            !dsArgs[ds.id]?.[file.partitionId] &&
            !dsArgs[ds.id]?._all
          ) {
            continue; // Skip files not specified in args
          }
          const localPath = path.join(
            __dirname,
            "..",
            "data",
            ...file.localFolderPath
          );
          console.log(
            `You now need to download the file manually and save it to ${localPath}`
          );
          // Wait for user input before proceeding
          await rl.question(
            "Hit ENTER to open the browser on the download URL"
          );
          // Open the download URL in the browser
          await open(file.downloadUrl);
        }

        const importFn = await import(
          path.join("..", "..", "profiles", ds.id, "non-open-importer")
        );
        console.log("XXXXXXXXXXXXX", importFn.default);

        await importFn.default(ds);
      } else {
        console.warn(`No non-open files found for dataset ${ds.id}`);
      }
    }
  }
}

main()
  .then(() => {
    console.log("All non-open files downloaded and imported.");
    rl.close();
  })
  .catch(err => {
    console.error("Error during download or import:", err);
    rl.close();
  });

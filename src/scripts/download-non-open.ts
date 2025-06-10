import { promises as fs } from "fs";
import oldFs from "fs";
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  for (const ds of Object.values(datasets)) {
    if (!Object.keys(dsArgs).length || dsArgs[ds.id]) {
      if (ds.metadata.nonOpen?.files) {
        console.log(`Downloading non-open files for dataset ${ds.id}`);
        for (const file of ds.metadata.nonOpen.files) {
          if (
            Object.keys(dsArgs).length &&
            !dsArgs[ds.id]?.[file.partitionId] &&
            !dsArgs[ds.id]?._all
          ) {
            continue; // Skip files not specified in args
          }
          const localPath = path.join(
            __dirname,
            "..",
            "..",
            "profiles",
            ds.id,
            ...file.localFolderPath
          );

          // Ensure the local directory exists
          if (!oldFs.existsSync(localPath)) {
            console.log(`Creating directory ${localPath}`);
            await fs.mkdir(localPath, { recursive: true });
          }

          console.log(
            `You now need to download the file manually and save it to ${localPath}`
          );
          // Wait for user input before proceeding
          await rl.question(
            "Press any key to open the download URL in your browser..."
          );
          // Open the download URL in the browser
          await open(file.downloadUrl);

          await rl.question(
            `Press any key after you have downloaded the file, extracted it (if needed) and saved it to ${localPath}...`
          );
        }

        const importFnPath = path.join(
          __dirname,
          "..",
          "..",
          "profiles",
          ds.id,
          "non-open-importer"
        );
        const importFn = await import(importFnPath);

        console.log(
          `Loading non-open files importer for dataset ${ds.id} from ${importFnPath}`
        );
        await importFn.default(ds);
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

import { DatasetProfile, PartitionData } from "src";
import path from "path";
import fs from "fs";

export default async function (ds: DatasetProfile) {
  for (const f of ds.metadata.nonOpen?.files || []) {
    const localFolderPath = path.join(
      __dirname,
      "..",
      ds.id,
      ...f.localFolderPath
    );

    console.log(
      `Loading non-open file for dataset ${ds.id} from ${localFolderPath}`
    );
    const fileNames = fs.readdirSync(localFolderPath);
    const data = await readCsv(path.join(localFolderPath, fileNames[0]));

    // save json to partition data file
    const partitionDataFile = path.join(
      __dirname,
      "..",
      ds.id,
      `${f.partitionId}.part.json`
    );
    console.log(
      `Saving ${ds.id}#${f.partitionId} partition data to ${partitionDataFile}`
    );
    await fs.promises.writeFile(
      partitionDataFile,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  }
}

async function readCsv(filePath: string): Promise<PartitionData[]> {
  return new Promise((resolve, reject) => {
    const results: PartitionData[] = [];
    fs.createReadStream(filePath)
      .on("data", data => {
        // split the data into lines
        const lines = data.toString().split("\n");
        for (const line of lines) {
          if (!line.trim()) continue; // skip empty lines
          const parts = line.split("\t");
          if (parts.length !== 3) continue; // skip malformed lines
          const [term1, term2, value] = parts.map(part => part.trim());
          results.push({ term1, term2, value: parseFloat(value) });
        }
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", error => {
        reject(error);
      });
  });
}

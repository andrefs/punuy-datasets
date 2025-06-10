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
    const json = await readCsv(fileNames[0]);

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
    console.log(json);
  }
}

async function readCsv(filePath: string) {
  return new Promise((resolve, reject) => {
    const results: PartitionData[] = [];
    fs.createReadStream(filePath)
      .on("data", (data: [string, string, number]) => {
        results.push({
          term1: data[0],
          term2: data[1],
          value: Number(data[2]),
        });
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", error => {
        reject(error);
      });
  });
}

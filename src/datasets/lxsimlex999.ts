import { DatasetProfile, Partition } from "../lib/types";
import { lazyPartition } from "../lib/lazy-partition";
import dataset from "../../profiles/lxsimlex999/dataset.json";
import path from "path";
const folder = "../../profiles/lxsimlex999";
import fs from "fs";

const ds = {
  ...dataset,
  partitions: dataset.partitions.flatMap(p => {
    // define partition path relative to current script
    const partPath = path.join(__dirname, folder, p.id + ".part.json");
    if (!fs.existsSync(partPath)) {
      console.warn(
        `Partition file not found: ${partPath}, ignoring ${dataset.id} ${p.id}`
      );
      return [];
    }
    return lazyPartition(p as Omit<Partition, "data">, partPath);
  }),
};

export default ds as DatasetProfile;

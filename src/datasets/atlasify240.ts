import { DatasetProfile, Partition } from "../lib/types";
import { lazyPartition } from "../lib/lazy-partition";
import dataset from "../../profiles/atlasify240/dataset.json";
import path from "path";
const folder = "../../profiles/atlasify240";

const ds = {
  ...dataset,
  partitions: dataset.partitions.map(p => {
    // define partition path relative to current script
    const partPath = path.join(__dirname, folder, p.id + ".part.json");
    return lazyPartition(p as Omit<Partition, "data">, partPath);
  }),
};

export default ds as DatasetProfile;

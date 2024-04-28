import { DatasetProfile, Partition } from "../lib/types";
import { lazyPartition } from "../lib/lazy-partition";
import dataset from "../../profiles/tr9856/dataset.json";
import path from "path";

for (const [index, partition] of dataset.partitions.entries()) {
  // define partition path relative to current script
  const partPath = path.join(
    __dirname,
    "../../profiles/tr9856",
    partition.id + ".part.json"
  );

  (dataset as DatasetProfile).partitions[index] = lazyPartition(
    partition as Omit<Partition, "data">,
    partPath
  );
}

export default dataset as DatasetProfile;

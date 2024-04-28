import { DatasetProfile, Partition } from "../lib/types";
import { lazyPartition } from "src/lib/lazy-partition";
import dataset from "../../profiles/mc30/dataset.json";
import path from "path";

for (const [index, partition] of dataset.partitions.entries()) {
  // define partition path relative to current script
  const partPath = path.join(
    __dirname,
    "../../profiles/mc30",
    partition.id + ".part.json"
  );

  (dataset as unknown as DatasetProfile).partitions[index] = lazyPartition(
    partition as Omit<Partition, "data">,
    partPath
  );
}

export default dataset as unknown as DatasetProfile;

import { DatasetProfile, Partition } from "../lib/types";
import { lazyPartition } from "../lib/lazy-partition";
import dataset from "../../profiles/emocon/dataset.json";
import path from "path";

for (const [index, partition] of dataset.partitions.entries()) {
  // define partition path relative to current script
  const partPath = path.join(
    __dirname,
    "../../profiles/emocon",
    partition.id + ".part.json"
  );

  (dataset as unknown as DatasetProfile).partitions[index] = lazyPartition(
    partition as Omit<Partition, "data">,
    partPath
  );
}

export default dataset as unknown as DatasetProfile;

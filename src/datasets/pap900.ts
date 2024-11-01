import { DatasetProfile, LazyDataset, Partition } from "../lib/types";
import { lazyPartition } from "../lib/lazy-partition";
import dataset from "../../profiles/pap900/dataset.json";
import path from "path";

const _ds = dataset as LazyDataset;

for (const [index, partition] of dataset.partitions.entries()) {
  // define partition path relative to current script
  const partPath = path.join(
    __dirname,
    "../../profiles/pap900",
    partition.id + ".part.json"
  );

  _ds.partitions[index] = lazyPartition(
    partition as Omit<Partition, "data">,
    partPath
  );
}

export default _ds as DatasetProfile;

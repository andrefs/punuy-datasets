import { Partition, PartitionData } from "./types";
import fs from "fs";
import logger from "./logger";

export function lazyPartition(
  part: Omit<Partition, "data">,
  path: string
): Partition {
  let _data: PartitionData[] | null = null;

  return new Proxy(part, {
    get(target, prop, receiver) {
      if (prop === "data") {
        if (!_data) {
          logger.debug(`Loading partition data from ${path}`);
          _data = JSON.parse(fs.readFileSync(path, "utf-8")) as PartitionData[];
        }
        return _data;
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as Partition;
}

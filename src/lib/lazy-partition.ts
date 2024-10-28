import { Partition, PartitionData } from "./types";
import fs from "fs";
import logger from "./logger";

export function fixPartData(
  part: PartitionData,
  options: LazyPartitionOptions = {
    trim: true,
    replaceUTF8Quotes: true,
    noUnderScores: true,
  }
): PartitionData {
  let term1 = part.term1;
  let term2 = part.term2;

  if (options.replaceUTF8Quotes) {
    term1 = term1
      .replace(/’/g, "'")
      .replace(/‘/g, "'")
      .replace(/”/g, '"')
      .replace(/“/g, '"');
    term2 = term2
      .replace(/’/g, "'")
      .replace(/‘/g, "'")
      .replace(/”/g, '"')
      .replace(/“/g, '"');
  }
  if (options.noUnderScores) {
    term1 = term1.replace(/_+/g, " ");
    term2 = term2.replace(/_+/g, " ");
  }
  if (options.trim) {
    term1 = term1.trim();
    term2 = term2.trim();
  }
  return {
    ...part,
    term1,
    term2,
  };
}

interface LazyPartitionOptions {
  trim?: boolean;
  replaceUTF8Quotes?: boolean;
  noUnderScores?: boolean;
}
export function lazyPartition(
  part: Omit<Partition, "data">,
  path: string,
  options: LazyPartitionOptions = {}
): Partition {
  let _data: PartitionData[] | null = null;

  return new Proxy(part, {
    get(target, prop, receiver) {
      if (prop === "data") {
        if (!_data) {
          logger.debug(`Loading partition data from ${path}`);
          _data = JSON.parse(fs.readFileSync(path, "utf-8")) as PartitionData[];
        }

        return _data.map(d => fixPartData(d, options));
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as Partition;
}

import { Partition, PartitionData } from "./types";
import fs from "fs";
import logger from "./logger";

export function lazyPartition(
  part: Omit<Partition, "data">,
  path: string,
  { trim = true, replaceUTF8Quotes = true } = {}
): Partition {
  let _data: PartitionData[] | null = null;

  return new Proxy(part, {
    get(target, prop, receiver) {
      if (prop === "data") {
        if (!_data) {
          logger.debug(`Loading partition data from ${path}`);
          _data = JSON.parse(fs.readFileSync(path, "utf-8")) as PartitionData[];
        }

        return _data.map(d => {
          let term1 = d.term1;
          let term2 = d.term2;
          if (trim) {
            term1 = term1.trim();
            term2 = term2.trim();
          }
          if (replaceUTF8Quotes) {
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
          return {
            ...d,
            term1,
            term2,
          };
        });
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as Partition;
}

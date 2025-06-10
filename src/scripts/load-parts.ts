import * as datasets from "..";

for (const ds of Object.values(datasets)) {
  for (const part of ds.partitions)
    console.log(`${ds.id}#${part.id}: ${part.data.length}`);
}

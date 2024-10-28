import fs from "fs/promises";
import { PartitionData } from "src/lib/types";
import path from "path";
import { fixPartData } from "../lib/lazy-partition";

const SRC_FOLDER = process.argv[2];
if (!SRC_FOLDER) {
  console.error("Usage: ts-node check-chars.ts <src-folder>");
  process.exit(1);
}

async function readFoldersInFolder(folder: string) {
  const files = await fs.readdir(folder, { withFileTypes: true });
  return files.filter(f => f.isDirectory()).map(f => f.name);
}

async function readPartitionsInFolder(folder: string) {
  const files = await fs.readdir(folder, { withFileTypes: true });
  return files
    .filter(f => f.name.endsWith(".json") && !f.name.endsWith("dataset.json"))
    .map(f => f.name);
}

async function readPartitionFile(file: string) {
  const data = await fs.readFile(file, "utf-8");
  const part = JSON.parse(data) as PartitionData[];
  return part;
}

function checkPartition(partName: string, part: PartitionData[]): boolean {
  // Regular expression to match valid word characters including accents, apostrophes, and digits.
  const validCharRegex = /^[-.?+&,():!/\p{L}\p{M}\p{N}0-9' ]+$/u;

  let allValid = true;

  for (const [i, d] of part.entries()) {
    const fixed = fixPartData(d);
    for (const t of ["term1", "term2"]) {
      const str = fixed[t as keyof PartitionData] as string;
      if (!validCharRegex.test(str)) {
        allValid = false;
        const invalidChars = str
          .split("")
          .map((char, pos) =>
            validCharRegex.test(char) ? null : { char, pos }
          )
          .filter(Boolean);

        console.warn(
          `Warning: Invalid characters in "${t}" of pair ("${fixed.term1}", "${fixed.term2}") at ${partName}, index ${i}:`
        );
        for (const { char, pos } of invalidChars.filter(ic => !!ic)) {
          console.warn(`  - Invalid character "${char}" at position ${pos}`);
        }
      }
    }
  }
  if (allValid) {
    console.log(`All characters in ${partName} are valid`);
  }

  return allValid;
}
async function main() {
  let allOk = true;
  const folders = await readFoldersInFolder(SRC_FOLDER);
  for (const folder of folders) {
    const partitions = await readPartitionsInFolder(`${SRC_FOLDER}/${folder}`);
    for (const partFile of partitions) {
      const part = await readPartitionFile(
        path.join(SRC_FOLDER, folder, partFile)
      );
      const ok = checkPartition(`${folder}/${partFile}`, part);
      if (!ok) {
        allOk = false;
      }
    }
  }
  return allOk;
}

main()
  .then(res => {
    if (!res) {
      console.error("Some partitions have invalid characters");
      process.exit(1);
    }
    console.log("Done");
    process.exit(0);
  })
  .catch(console.error);

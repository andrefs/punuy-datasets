import { promises as fs } from "fs";
import { DatasetProfile } from "@types";

async function getFileNames(folder: string) {
  const res = [];
  try {
    const fileNames = await fs.readdir(folder);
    for (const fileName of fileNames) {
      if (!fileName.endsWith(".json")) {
        continue;
      }
      res.push(fileName);
    }
  } catch (err) {
    process.exit(1);
  }
  return res;
}

interface PartInfo {
  dsId: string;
  partId: string;
  year: number;
  measureType: string;
  size: number;
  totalAnnot: number;
  pairAnnot: number;
  pearson: number;
  spearman: number;
}

async function getPartitions(file: string) {
  const data = await fs.readFile(file, "utf-8");
  const all = JSON.parse(data) as DatasetProfile;
  const dsId = all.id;
  const dsYear = Number(all.metadata.date.substring(0, 4));

  const res = [];

  for (const p of all.partitions) {
    res.push({
      dsId,
      partId: p.id,
      year: dsYear,
      size: p.data.length,
      measureType: p.measureType,
      totalAnnot: p.metrics.annotators.total,
      pairAnnot: p.metrics.annotators.minEachPair,
      pearson: p.metrics.interAgreement.pearson,
      spearman: p.metrics.interAgreement.spearman,
    } as PartInfo);
  }
  return res;
}

function getCsvRow(partInfo: PartInfo) {
  const res = `"${partInfo.dsId}", "${partInfo.partId}", "${partInfo.year}", "${
    partInfo.size
  }",  "${partInfo.measureType}", "${partInfo.totalAnnot || ""}", "${
    partInfo.pairAnnot || ""
  }", "${partInfo.pearson || ""}", "${partInfo.spearman || ""}"\n`;
  return res;
}

function genCsvHeader() {
  const res =
    '"Dataset ID", "Partition ID", "Year", "Size",  "Measure Type",  "Total Annotators", "Pair Annotators", "Pearson", "Spearman"\n';
  return res;
}

async function main() {
  const folder = "./profiles";
  const files = await getFileNames(folder);
  let csv = genCsvHeader();
  const parts = [];
  for (const file of files) {
    const moreParts = await getPartitions(folder + "/" + file);
    parts.push(...moreParts);
  }
  for (const part of parts) {
    csv += getCsvRow(part);
  }
  writeCsv(csv);
}

async function writeCsv(csv: string) {
  await fs.writeFile("./metrics.csv", csv);
}

main().then(() => console.log("Done!"));

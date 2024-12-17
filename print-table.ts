import { promises as fs } from "fs";
import { DatasetProfile } from "./src/lib/types";
import path from "path";

const ignoreDS: string[] = [
  //"bg100k"
];

/* eslint-disable @typescript-eslint/no-unused-vars */
interface DsInfo {
  id: string;
  name: string;
  year: number;
  lang: string;
  domain: string;
  relationTypes: string;
  reference: string;
  website: string;
}

async function getFilesInfo(folder: string) {
  const res = [];
  const dsFileNames = await getFileNames(folder);
  for (const dsFN of dsFileNames) {
    const fileInfo = await getFileInfo(path.join(dsFN));
    res.push(fileInfo);
  }
  return res.sort((a, b) => a.year - b.year);
}

async function getFileNames(folder: string) {
  const res = [];
  let dsFolderNames: string[];
  try {
    dsFolderNames = await fs.readdir(folder);
  } catch (err) {
    console.error("Error reading folder", folder, err);
    process.exit(1);
  }
  for (const dsFN of dsFolderNames) {
    if (ignoreDS.some(ds => dsFN.includes(ds))) {
      continue;
    }
    const fn = path.join(folder, dsFN, "dataset.json");
    try {
      await fs.access(fn);
      res.push(fn);
    } catch (err) {
      continue;
    }
  }
  return res;
}

async function getFileInfo(file: string) {
  const data = await fs.readFile(file, "utf-8");
  const all = JSON.parse(data) as DatasetProfile;
  const relTypes = all.metadata.relationTypes
    .sort()
    .map(m => m.substring(0, 3))
    .join("/");

  return {
    id: all.id,
    name: all.metadata.name,
    year: Number(all.metadata.date.substring(0, 4)),
    lang: all.metadata.languages.join("/"),
    domain: all.metadata.domain,
    relationTypes: relTypes,
    reference: all.metadata.papers?.[0]?.url,
    website: all.metadata.urls?.[0],
  } as DsInfo;
}

async function loadReadme() {
  const readme = await fs.readFile("README.md", "utf-8");
  return readme;
}

async function getDatasetsText() {
  const folder = "./profiles";
  const filesInfo = await getFilesInfo(folder);

  let res = "";

  for await (const info of filesInfo) {
    res += getTableRow(info);
  }
  return res;
}

function getTableRow(dsInfo: DsInfo) {
  const fields = getTableFields(dsInfo);
  const res = `| ${fields.id} | ${fields.name} | ${fields.year} | ${fields.lang} | ${fields.domain} | ${fields.relationTypes} | ${fields.references.join(", ")} | \n`;
  return res;
}

function getTableFields(dsInfo: DsInfo) {
  const references = [];
  if (dsInfo.reference) {
    references.push(`[paper 📑](${dsInfo.reference})`);
  }
  if (dsInfo.website) {
    references.push(`[website 🌐](${dsInfo.website})`);
  }

  return {
    id: dsInfo.id,
    name: dsInfo.name,
    year: dsInfo.year,
    lang: dsInfo.lang,
    domain: dsInfo.domain,
    relationTypes: dsInfo.relationTypes,
    references,
  };
}

async function main() {
  const text = await getDatasetsText();
  console.log(text);
}

main().then(() => console.log("Done!"));

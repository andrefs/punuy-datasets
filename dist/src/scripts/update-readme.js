"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const ignoreDS = [
//"bg100k"
];
const datasetsENSectionStart = "<!-- datasets-section-start-EN -->";
const datasetsENSectionEnd = "<!-- datasets-section-end-EN -->";
const datasetsPTSectionStart = "<!-- datasets-section-start-PT -->";
const datasetsPTSectionEnd = "<!-- datasets-section-end-PT -->";
function getFilesInfo(folder, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = [];
        const dsFileNames = yield getFileNames(folder);
        for (const dsFN of dsFileNames) {
            const fileInfo = yield getFileInfo(path_1.default.join(dsFN));
            if (fileInfo.lang === language) {
                res.push(fileInfo);
            }
        }
        return res.sort((a, b) => a.year - b.year);
    });
}
function getFileNames(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = [];
        let dsFolderNames;
        try {
            dsFolderNames = yield fs_1.promises.readdir(folder);
        }
        catch (err) {
            console.error("Error reading folder", folder, err);
            process.exit(1);
        }
        for (const dsFN of dsFolderNames) {
            if (ignoreDS.some(ds => dsFN.includes(ds))) {
                continue;
            }
            const fn = path_1.default.join(folder, dsFN, "dataset.json");
            try {
                yield fs_1.promises.access(fn);
                res.push(fn);
            }
            catch (err) {
                continue;
            }
        }
        return res;
    });
}
function getFileInfo(file) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const data = yield fs_1.promises.readFile(file, "utf-8");
        const all = JSON.parse(data);
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
            reference: (_b = (_a = all.metadata.papers) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url,
            website: (_c = all.metadata.urls) === null || _c === void 0 ? void 0 : _c[0],
        };
    });
}
function loadReadme() {
    return __awaiter(this, void 0, void 0, function* () {
        const readme = yield fs_1.promises.readFile("README.md", "utf-8");
        return readme;
    });
}
function generateDatasetsSection(language) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const folder = "./profiles";
        const filesInfo = yield getFilesInfo(folder, language);
        const dss = language === "en" ? datasetsENSectionStart : datasetsPTSectionStart;
        const dse = language === "en" ? datasetsENSectionEnd : datasetsPTSectionEnd;
        let res = `${dss}\n`;
        res +=
            "<!-- Automatically generated by ./src/scripts/update-readme.ts -->\n\n";
        res += genTableHeader();
        let i = 1;
        try {
            for (var _d = true, filesInfo_1 = __asyncValues(filesInfo), filesInfo_1_1; filesInfo_1_1 = yield filesInfo_1.next(), _a = filesInfo_1_1.done, !_a; _d = true) {
                _c = filesInfo_1_1.value;
                _d = false;
                const info = _c;
                res += getTableRow(info, i++);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = filesInfo_1.return)) yield _b.call(filesInfo_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        res += `\n${dse}`;
        return res;
    });
}
function getTableRow(dsInfo, i) {
    const fields = getTableFields(dsInfo);
    const res = `| ${i} | ${fields.id} | ${fields.name} | ${fields.year} | ${fields.domain} | ${fields.relationTypes} | ${fields.references.join(", ")} | \n`;
    return res;
}
function getTableFields(dsInfo) {
    const references = [];
    if (dsInfo.reference) {
        references.push(`[paper 📑](${dsInfo.reference})`);
    }
    if (dsInfo.website) {
        references.push(`[website 🌐](${dsInfo.website})`);
    }
    return {
        id: `[${dsInfo.id}](./profiles/${dsInfo.id})`,
        name: dsInfo.name,
        year: dsInfo.year,
        domain: dsInfo.domain,
        relationTypes: dsInfo.relationTypes,
        references,
    };
}
function genTableHeader() {
    let res = `| # | ID | Name | Year  | Domain | Sim/Rel | References \n`;
    res += `| --- | --- | --- | --- | --- | --- | --- |  \n`;
    return res;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const readme = yield loadReadme();
        // english
        let start = readme.indexOf(datasetsENSectionStart);
        let end = readme.indexOf(datasetsENSectionEnd) + datasetsENSectionEnd.length;
        let datasetsSection = yield generateDatasetsSection("en");
        let newReadme = readme.substring(0, start) +
            datasetsSection +
            readme.substring(end, readme.length);
        // portuguese
        start = newReadme.indexOf(datasetsPTSectionStart);
        end = newReadme.indexOf(datasetsPTSectionEnd) + datasetsPTSectionEnd.length;
        datasetsSection = yield generateDatasetsSection("pt");
        newReadme =
            newReadme.substring(0, start) +
                datasetsSection +
                newReadme.substring(end, newReadme.length);
        yield fs_1.promises.writeFile("README.md", newReadme);
    });
}
main().then(() => console.log("Done!"));
//# sourceMappingURL=update-readme.js.map
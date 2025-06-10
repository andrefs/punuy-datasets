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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function default_1(ds) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        for (const f of ((_a = ds.metadata.nonOpen) === null || _a === void 0 ? void 0 : _a.files) || []) {
            const localFolderPath = path_1.default.join(__dirname, "..", ds.id, ...f.localFolderPath);
            console.log(`Loading non-open file for dataset ${ds.id} from ${localFolderPath}`);
            const fileNames = fs_1.default.readdirSync(localFolderPath);
            const data = yield readCsv(path_1.default.join(localFolderPath, fileNames[0]));
            // save json to partition data file
            const partitionDataFile = path_1.default.join(__dirname, "..", ds.id, `${f.partitionId}.part.json`);
            console.log(`Saving ${ds.id}#${f.partitionId} partition data to ${partitionDataFile}`);
            yield fs_1.default.promises.writeFile(partitionDataFile, JSON.stringify(data, null, 2), "utf-8");
        }
    });
}
function readCsv(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const results = [];
            fs_1.default.createReadStream(filePath)
                .on("data", data => {
                // split the data into lines
                const lines = data.toString().split("\n");
                for (const line of lines) {
                    if (!line.trim())
                        continue; // skip empty lines
                    const parts = line.split("\t");
                    if (parts.length !== 3)
                        continue; // skip malformed lines
                    const [term1, term2, value] = parts.map(part => part.trim());
                    results.push({ term1, term2, value: parseFloat(value) });
                }
            })
                .on("end", () => {
                resolve(results);
            })
                .on("error", error => {
                reject(error);
            });
        });
    });
}
//# sourceMappingURL=non-open-importer.js.map
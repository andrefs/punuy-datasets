"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline = __importStar(require("node:readline/promises"));
const node_process_1 = require("node:process");
const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
const open_1 = __importDefault(require("open"));
function readProfiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const folder = path_1.default.join(__dirname, "..", "..", "profiles");
        const res = {};
        const dsFolderNames = yield fs_1.promises.readdir(folder);
        for (const dsFN of dsFolderNames) {
            const fn = path_1.default.join(folder, dsFN, "dataset.json");
            try {
                yield fs_1.promises.access(fn);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            }
            catch (err) {
                continue; // Skip if file does not exist
            }
            try {
                console.log(`Reading dataset profile from ${fn}`);
                const data = yield fs_1.promises.readFile(fn, "utf-8");
                const profile = JSON.parse(data);
                res[profile.id] = profile;
            }
            catch (err) {
                console.error(`Error reading dataset profile ${fn}:`, err);
            }
        }
        return res;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const datasets = yield readProfiles();
        const dsArgs = process.argv.slice(2).reduce((acc, arg) => {
            const [ds, part] = arg.split("#");
            if (!part) {
                acc[ds] = acc[ds] || { _all: true };
            }
            else {
                acc[ds] = acc[ds] || {};
                acc[ds][part] = true;
            }
            return acc;
        }, {}) || null;
        for (const ds of Object.values(datasets)) {
            if (!Object.keys(dsArgs).length || dsArgs[ds.id]) {
                if ((_a = ds.metadata.nonOpen) === null || _a === void 0 ? void 0 : _a.files) {
                    console.log(`Downloading non-open files for dataset ${ds.id}`);
                    for (const file of ds.metadata.nonOpen.files) {
                        if (Object.keys(dsArgs).length &&
                            !((_b = dsArgs[ds.id]) === null || _b === void 0 ? void 0 : _b[file.partitionId]) &&
                            !((_c = dsArgs[ds.id]) === null || _c === void 0 ? void 0 : _c._all)) {
                            continue; // Skip files not specified in args
                        }
                        const localPath = path_1.default.join(__dirname, "..", "..", "profiles", ds.id, ...file.localFolderPath);
                        // Ensure the local directory exists
                        if (!fs_2.default.existsSync(localPath)) {
                            console.log(`Creating directory ${localPath}`);
                            yield fs_1.promises.mkdir(localPath, { recursive: true });
                        }
                        console.log(`You now need to download the file manually and save it to ${localPath}`);
                        // Wait for user input before proceeding
                        yield rl.question("Press any key to open the download URL in your browser...");
                        // Open the download URL in the browser
                        yield (0, open_1.default)(file.downloadUrl);
                        yield rl.question(`Press any key after you have downloaded the file, extracted it (if needed) and saved it to ${localPath}...`);
                    }
                    const importFnPath = path_1.default.join(__dirname, "..", "..", "profiles", ds.id, "non-open-importer.js" // when converted to js need .js extension
                    );
                    const importFn = yield import(importFnPath);
                    console.log(`Loading non-open files importer for dataset ${ds.id} from ${importFnPath}`);
                    yield importFn.default.default(ds); // weird problem when converted to js, so using default.default
                }
            }
        }
    });
}
main()
    .then(() => {
    console.log("All non-open files downloaded and imported.");
    rl.close();
})
    .catch(err => {
    console.error("Error during download or import:", err);
    rl.close();
});
//# sourceMappingURL=download-non-open.js.map
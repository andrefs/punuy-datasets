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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const lazy_partition_1 = require("../lib/lazy-partition");
const SRC_FOLDER = process.argv[2];
if (!SRC_FOLDER) {
    console.error("Usage: ts-node check-chars.ts <src-folder>");
    process.exit(1);
}
function readFoldersInFolder(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield promises_1.default.readdir(folder, { withFileTypes: true });
        return files.filter(f => f.isDirectory()).map(f => f.name);
    });
}
function readPartitionsInFolder(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield promises_1.default.readdir(folder, { withFileTypes: true });
        return files
            .filter(f => f.name.endsWith(".json") && !f.name.endsWith("dataset.json"))
            .map(f => f.name);
    });
}
function readPartitionFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile(file, "utf-8");
        const part = JSON.parse(data);
        return part;
    });
}
function checkPartition(partName, part) {
    // Regular expression to match valid word characters including accents, apostrophes, and digits.
    const validCharRegex = /^[-.?+&,():!/\p{L}\p{M}\p{N}0-9' ]+$/u;
    let allValid = true;
    for (const [i, d] of part.entries()) {
        const fixed = (0, lazy_partition_1.fixPartData)(d);
        for (const t of ["term1", "term2"]) {
            const str = fixed[t];
            if (!validCharRegex.test(str)) {
                allValid = false;
                const invalidChars = str
                    .split("")
                    .map((char, pos) => validCharRegex.test(char) ? null : { char, pos })
                    .filter(Boolean);
                console.warn(`Warning: Invalid characters in "${t}" of pair ("${fixed.term1}", "${fixed.term2}") at ${partName}, index ${i}:`);
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let allOk = true;
        const folders = yield readFoldersInFolder(SRC_FOLDER);
        for (const folder of folders) {
            const partitions = yield readPartitionsInFolder(`${SRC_FOLDER}/${folder}`);
            for (const partFile of partitions) {
                const part = yield readPartitionFile(path_1.default.join(SRC_FOLDER, folder, partFile));
                const ok = checkPartition(`${folder}/${partFile}`, part);
                if (!ok) {
                    allOk = false;
                }
            }
        }
        return allOk;
    });
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
//# sourceMappingURL=check-chars.js.map
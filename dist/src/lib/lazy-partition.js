"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixPartData = fixPartData;
exports.lazyPartition = lazyPartition;
const fs_1 = __importDefault(require("fs"));
function fixPartData(part, options = {
    trim: true,
    replaceUTF8Quotes: true,
    noUnderScores: true,
    replaceUTF8Dashes: true,
}) {
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
    if (options.replaceUTF8Dashes) {
        term1 = term1.replace(/–/g, "-");
        term2 = term2.replace(/–/g, "-");
    }
    if (options.noUnderScores) {
        term1 = term1.replace(/_+/g, " ");
        term2 = term2.replace(/_+/g, " ");
    }
    if (options.trim) {
        term1 = term1.trim();
        term2 = term2.trim();
    }
    return Object.assign(Object.assign({}, part), { term1,
        term2 });
}
function lazyPartition(part, path, options = {}) {
    let _data = null;
    return new Proxy(part, {
        get(target, prop, receiver) {
            if (prop === "data") {
                if (!_data) {
                    // log with time stamp
                    console.warn(`[${new Date().toLocaleTimeString()} Loading partition data from ${path}`);
                    _data = JSON.parse(fs_1.default.readFileSync(path, "utf-8"));
                }
                return _data.map(d => fixPartData(d, options));
            }
            return Reflect.get(target, prop, receiver);
        },
    });
}
//# sourceMappingURL=lazy-partition.js.map
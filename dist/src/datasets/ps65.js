"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lazy_partition_1 = require("../lib/lazy-partition");
const dataset_json_1 = __importDefault(require("../../profiles/ps65/dataset.json"));
const path_1 = __importDefault(require("path"));
const folder = "../../profiles/ps65";
const ds = Object.assign(Object.assign({}, dataset_json_1.default), { partitions: dataset_json_1.default.partitions.map(p => {
        // define partition path relative to current script
        const partPath = path_1.default.join(__dirname, folder, p.id + ".part.json");
        return (0, lazy_partition_1.lazyPartition)(p, partPath);
    }) });
exports.default = ds;
//# sourceMappingURL=ps65.js.map
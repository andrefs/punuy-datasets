"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const level = process.env.PINO_LOG_LEVEL || "info";
const transport = pino_1.default.transport({
    targets: [
        {
            level,
            target: "pino/file",
            options: { destination: `${__dirname}/../../app.log` },
        },
        {
            level,
            target: "pino-pretty",
        },
    ],
});
exports.default = (0, pino_1.default)({
    level,
    timestamp: pino_1.default.stdTimeFunctions.isoTime,
}, transport);
//# sourceMappingURL=logger.js.map
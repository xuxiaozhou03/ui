"use strict";
// This is the entry point of the TypeScript application.
// You can add your main logic, functions, or classes here.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const helper_1 = require("./helper");
const data = (0, helper_1.getWxml)("button");
const ts = (0, helper_1.getTypescript)("button");
// console.log(JSON.stringify(data, null, 2));
fs_1.default.writeFileSync(`${helper_1.outputPath}/button.json`, JSON.stringify(data, null, 2));
fs_1.default.writeFileSync(`${helper_1.outputPath}/button.ts.json`, JSON.stringify(ts, null, 2));

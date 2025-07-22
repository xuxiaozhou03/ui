"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePackage = void 0;
const fs_1 = __importDefault(require("fs"));
const helper_1 = require("./helper");
const parseTs_1 = require("./parseTs");
const parseWxml_1 = require("./parseWxml");
const parsePackage = (packageName) => {
    let wxmlData = null;
    const wxml = (0, helper_1.getFileContent)(packageName + "/index.wxml");
    if (wxml) {
        wxmlData = (0, parseWxml_1.parseWxml)(wxml);
    }
    let tsData = null;
    const ts = (0, helper_1.getFileContent)(packageName + "/index.ts");
    if (ts) {
        tsData = (0, parseTs_1.parseTs)(ts);
    }
    let wxs = (0, helper_1.getFileContent)(packageName + "/index.wxs");
    let wxsData = null;
    if (wxs) {
        wxsData = (0, parseTs_1.parseTs)(wxs);
    }
    let wxss = (0, helper_1.getDistFileContent)(packageName + "/index.wxss");
    wxss = wxss ? wxss.replace("@import '../common/index.wxss';", "") : "";
    const data = {
        wxml: wxmlData,
        ts: tsData,
        wxs: wxsData,
        wxss: wxss,
    };
    fs_1.default.writeFileSync(`${helper_1.outputPath}/${packageName}.json`, JSON.stringify(data, null, 2));
};
exports.parsePackage = parsePackage;

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
    const dirName = `van-${packageName}`;
    // 确保目录存在
    const packagePath = `${helper_1.outputPath}/${dirName}`;
    if (!fs_1.default.existsSync(packagePath)) {
        fs_1.default.mkdirSync(packagePath, { recursive: true });
    }
    const componentName = dirName + ".vue";
    let template = null;
    const wxml = (0, helper_1.getFileContent)(packageName + "/index.wxml");
    if (wxml) {
        template = (0, parseWxml_1.generateTemplate)(wxml);
    }
    let tsData = "";
    const ts = (0, helper_1.getFileContent)(packageName + "/index.ts");
    if (ts) {
        tsData = (0, parseTs_1.generateScript)(ts);
    }
    let wxs = (0, helper_1.getFileContent)(packageName + "/index.wxs");
    let wxsData = null;
    if (wxs) {
        // wxsData = parseTs(wxs);
    }
    let wxss = (0, helper_1.getDistFileContent)(packageName + "/index.wxss");
    wxss = wxss ? wxss.replace("@import '../common/index.wxss';", "") : "";
    const vue = `
  <template>
  ${template}
  </template>
  <script lang="ts" setup>
  ${tsData}
  </script>
  <style>${wxss}</style>
  `;
    fs_1.default.writeFileSync(`${packagePath}/${componentName}`, vue);
};
exports.parsePackage = parsePackage;

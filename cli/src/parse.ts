import fs from "fs";
import { getDistFileContent, getFileContent, outputPath } from "./helper";
import { generateScript } from "./parseTs";
import { generateTemplate } from "./parseWxml";

export const parsePackage = (packageName: string) => {
  const dirName = `van-${packageName}`;

  // 确保目录存在
  const packagePath = `${outputPath}/${dirName}`;
  if (!fs.existsSync(packagePath)) {
    fs.mkdirSync(packagePath, { recursive: true });
  }

  const componentName = dirName + ".vue";

  let template = null;
  const wxml = getFileContent(packageName + "/index.wxml");
  if (wxml) {
    template = generateTemplate(wxml);
  }

  let tsData = "";
  const ts = getFileContent(packageName + "/index.ts");
  if (ts) {
    tsData = generateScript(ts);
  }

  let wxs = getFileContent(packageName + "/index.wxs");
  let wxsData = null;
  if (wxs) {
    // wxsData = parseTs(wxs);
  }

  let wxss = getDistFileContent(packageName + "/index.wxss");
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
  fs.writeFileSync(`${packagePath}/${componentName}`, vue);
};

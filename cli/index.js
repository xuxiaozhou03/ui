// 读取vant-weapp-dev/packages下的所有目录

const fs = require("fs");
const path = require("path");

const packagesDir = path.join(__dirname, "../vant-weapp-dev/packages");
const buildDir = path.join(__dirname, "../vant-weapp-dev/build");
const outpuDir = path.join(
  __dirname,
  "..",
  "app",
  "src",
  "uni_modules",
  "vant",
  "components"
);
const readFileContent = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    return null;
  }
};

const handlerPackageDemo = (packageName) => {
  const fullPath = path.join(packagesDir, packageName, "demo");
  if (!fs.existsSync(fullPath)) {
    return;
  }
  const wxml = readFileContent(path.join(fullPath, "index.wxml"));
  if (!wxml) {
    return;
  }
  const ts = readFileContent(path.join(fullPath, "index.ts"));
  const less = readFileContent(path.join(fullPath, "index.less"));
  const vue = `<template>
  ${wxml}
</template>
<script lang="ts" setup>
${ts ? ts : ""}
</script>
${less ? `<style>${less}</style>` : ""}
`;
  const outputName = "van-" + packageName;
  fs.writeFileSync(path.join(outpuDir, outputName, "demo.vue"), vue);
};

const handlerPackage = (packageName) => {
  const fullPath = path.join(packagesDir, packageName);
  const wxml = readFileContent(path.join(fullPath, "index.wxml"));
  const wxs = readFileContent(path.join(fullPath, "index.wxs"));
  const ts = readFileContent(path.join(fullPath, "index.ts"));
  const wxss = readFileContent(path.join(buildDir, packageName, "index.wxss"));
  const vue = `
  <template>
   ${wxml}
  </template>
  <script lang="ts" setup>
  ${ts}
  ${wxs ? `// 以下代码转换为 computed 属性 \n ${wxs}` : ""}
  </script>
  ${
    wxss
      ? `
<style>
@import "./style.css";
</style>
`
      : ""
  }
  `;

  const outputName = "van-" + packageName;
  const propsName = packageName
    .split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join("");

  // 确保输出目录存在
  const outputDir = path.join(outpuDir, outputName);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outputDir, outputName + ".vue"), vue);
  fs.writeFileSync(
    path.join(outputDir, "props.ts"),
    `import type { ExtractPropTypes } from "vue";
export const ${propsName}Props = {}

export type ${propsName}PropsType = ExtractPropTypes<typeof ${propsName}Props>
  `
  );
  if (wxss) {
    fs.writeFileSync(
      path.join(outputDir, "style.css"),
      wxss.replace("@import '../common/index.wxss';", "")
    );
  }
};

fs.readdirSync(packagesDir)
  .filter((dir) => {
    const passDirs = ["common", "definitions", "mixins", "wxs"];
    if (passDirs.includes(dir)) {
      return false;
    }
    const fullPath = path.join(packagesDir, dir);
    return fs.statSync(fullPath).isDirectory();
  })
  .forEach((packageName) => {
    handlerPackage(packageName);
    handlerPackageDemo(packageName);
  });

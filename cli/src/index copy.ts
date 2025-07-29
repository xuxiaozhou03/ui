import * as fs from "fs";
import * as path from "path";

const packagesPath = path.resolve(__dirname, "../../vant-weapp-dev/packages");
const buildPath = path.resolve(__dirname, "../../vant-weapp-dev/build");

const getFileContent = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    return "";
  }
};

const packages = fs.readdirSync(packagesPath).filter((name) => {
  if (["wxs", "definitions", "common", "mixins"].includes(name)) {
    return false;
  }
  const fullPath = path.join(packagesPath, name);
  return fs.statSync(fullPath).isDirectory();
});

// 获取普通包内容
const getPackageFileContent = (packageName: string) => {
  const packagePath = path.join(packagesPath, packageName);
  const wxml = getFileContent(path.join(packagePath, "index.wxml"));
  const ts = getFileContent(path.join(packagePath, "index.ts"));
  const wxs = getFileContent(path.join(packagePath, "index.wxs"));
  const wxss = getFileContent(path.join(buildPath, packageName, "index.wxss"));
  return { wxml, ts, wxs, wxss };
};

// 获取 demo 包内容
const getDemoFileContent = (packageName: string) => {
  const demoPath = path.join(packagesPath, packageName, "demo");
  if (!fs.existsSync(path.join(demoPath, "index.wxml"))) {
    return { wxml: "", ts: "", wxs: "", wxss: "" };
  }
  const wxml = getFileContent(path.join(demoPath, "index.wxml"));
  const ts = getFileContent(path.join(demoPath, "index.ts"));
  const wxs = getFileContent(path.join(demoPath, "index.wxs"));
  const wxss = getFileContent(path.join(demoPath, "index.wxss"));
  return { wxml, ts, wxs, wxss };
};

const rename = (packageName: string) => {
  return packageName.replace(/-(\w)/g, (_, c) => c.toUpperCase());
};

// 生成组件 .vue 文件
const generateComponent = (packageName: string, content: string) => {
  const outputDir = path.join(
    __dirname,
    "..",
    "..",
    "app",
    "src",
    "uni_modules",
    "vant",
    "components",
    packageName
  );
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outputDir, packageName + ".vue"), content);
};

// 生成 demo .vue 文件
const generateDemoComponent = (packageName: string, content: string) => {
  const outputDir = path.join(
    __dirname,
    "..",
    "..",
    "app",
    "src",
    "uni_modules",
    "vant",
    "components",
    packageName
  );
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outputDir, "demo.vue"), content);
};

const generatePackage = (packageName: string) => {
  const content = getPackageFileContent(packageName);
  const newName = rename(packageName);
  const fileName = "van-" + packageName;
  const ts = content.ts;
  let wxss = content.wxss.replace("@import '../common/index.wxss';", "");
  let wxml = content.wxml
    .replace('<wxs src="../wxs/utils.wxs" module="utils" />', "")
    .replace('<wxs src="./index.wxs" module="computed" />', "")
    .trim();
  let wxs = content.wxs;

  const vue = `
  <template>
    ${wxml}
  </template>
  <script lang="ts" setup>
import { type CSSProperties, computed } from "vue";
import { addUnit, bem } from "../../utils";
import { ${newName}Props } from "./props";
const props = defineProps(${newName}Props);
  ${ts}
// 下面转换为 computed 计算
  ${wxs}
  </script>
  <style>
  ${wxss}
  </style>
  `;

  generateComponent(fileName, vue);
};
let arr: string[] = [];
const generateDemo = (packageName: string) => {
  const content = getDemoFileContent(packageName);
  if (!content.wxml) {
    return;
  }
  arr.push(packageName);
  const demoPage = `
  <template>
  <Comp />
  </template>
  <script lang="ts" setup>
// import Comp from "../../uni_modules/vant/components/van-${packageName}/demo.vue";
import Comp from "../../uni_modules/demo/components/demo-page/demo-page.vue";
  </script>
  `;

  const pagePath = path.join(
    __dirname,
    "..",
    "..",
    "app",
    "src",
    "pages",
    packageName
  );
  if (!fs.existsSync(pagePath)) {
    fs.mkdirSync(pagePath, { recursive: true });
  }
  fs.writeFileSync(path.join(pagePath, "index.vue"), demoPage);

  const demoContent = `
<template>
${content.wxml}
</template>
<script lang="ts" setup>
${content.ts}
</script>
<style>
${content.wxss}
</style>
  `;
  generateDemoComponent("van-" + packageName, demoContent);
};

packages.forEach((packageName) => {
  generatePackage(packageName);
  generateDemo(packageName);
});

const str = arr.map((name) => {
  return {
    path: `pages/${name}/index`,
    style: {
      navigationBarTitleText: `${name}`,
    },
  };
});
str.unshift({
  path: "pages/index/index",
  style: {
    navigationBarTitleText: "uni-app",
  },
});
const json = `
{
  "pages": ${JSON.stringify(str, null, 2)},
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  }
}
`;

fs.writeFileSync(
  path.join(__dirname, "..", "..", "app", "src", "pages.json"),
  json
);

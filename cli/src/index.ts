import * as fs from "fs";
import * as path from "path";

const packagesPath = path.resolve(__dirname, "../../vant-weapp-dev/packages");
const packages = fs.readdirSync(packagesPath).filter((name) => {
  if (["wxs", "definitions", "common", "mixins"].includes(name)) {
    return false;
  }
  const fullPath = path.join(packagesPath, name);
  return fs.statSync(fullPath).isDirectory();
});
const buildPath = path.resolve(__dirname, "../../vant-weapp-dev/build");
const uniModulesPath = path.resolve(
  __dirname,
  "..",
  "..",
  "app",
  "src",
  "uni_modules",
  "vant",
  "components"
);

const getFileContent = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    return "";
  }
};

const generatePackage = (packageName: string) => {
  const componentName = "van-" + packageName;
  const packagePath = path.join(packagesPath, packageName);
  const wxml = getFileContent(path.join(packagePath, "index.wxml"));
  const ts = getFileContent(path.join(packagePath, "index.ts"));
  const wxs = getFileContent(path.join(packagePath, "index.wxs"));
  const wxss = getFileContent(path.join(buildPath, packageName, "index.wxss"));

  const content = `<template>
  ${wxml}
</template>
<script lang="ts" setup>
  ${ts}
  // 转换为 Vue 3 的 computed 属性
  ${wxs}
</script>
<style lang="scss" scoped>
  ${wxss}
</style>
`;
  if (!fs.existsSync(path.join(uniModulesPath, componentName))) {
    fs.mkdirSync(path.join(uniModulesPath, componentName), { recursive: true });
  }
  fs.writeFileSync(
    path.join(uniModulesPath, componentName, componentName + ".vue"),
    content,
    "utf-8"
  );
};

const generateDemo = (packageName: string) => {
  const packagePath = path.join(packagesPath, packageName);
  const wxml = getFileContent(path.join(packagePath, "demo", "index.wxml"));
  const ts = getFileContent(path.join(packagePath, "demo", "index.ts"));
  const less = getFileContent(path.join(packagePath, "demo", "index.less"));
  const wxs = getFileContent(path.join(packagePath, "demo", "index.wxs"));

  if (!wxml) {
    return;
  }

  const content = `<template>
  ${wxml}
</template>
<script lang="ts" setup>
  ${ts}
  // 转换为 Vue 3 的 computed 属性
  ${wxs}
</script>
<style lang="scss" scoped>
  ${less}
</style>
`;
  const componentName = "van-" + packageName;
  if (!fs.existsSync(path.join(uniModulesPath, componentName))) {
    fs.mkdirSync(path.join(uniModulesPath, componentName), { recursive: true });
  }
  fs.writeFileSync(
    path.join(uniModulesPath, componentName, "demo.vue"),
    content,
    "utf-8"
  );
};

const main = () => {
  packages.forEach((packageName) => {
    generatePackage(packageName);
    generateDemo(packageName);
  });
};
main();

// 获取 packages 的文件夹目录
const fs = require("fs");
const path = require("path");
const outDir = path.join(
  __dirname,
  "..",
  "src",
  "uni_modules",
  "vant",
  "components"
);
const packagesDir = path.join(__dirname, "packages");
const distsDir = path.join(__dirname, "out");

const safeGetFile = (url) => {
  try {
    return fs.readFileSync(url, "utf-8");
  } catch (e) {
    return "";
  }
};

const handlePackage = (package) => {
  const packageDir = path.join(packagesDir, package);
  const distDir = path.join(distsDir, package);
  const ts = safeGetFile(path.join(packageDir, "index.ts"));
  const wxml = safeGetFile(path.join(packageDir, "index.wxml"));
  const wxs = safeGetFile(path.join(packageDir, "index.wxs"));
  const css = safeGetFile(path.join(distDir, "index.wxss"));
  const content = `
    <template>
    ${wxml
      .replace('<wxs src="../wxs/utils.wxs" module="utils" />', "")
      .replace('<wxs src="./index.wxs" module="computed" />', "")}
    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    ${ts}

    ${
      wxs
        ? `// 把下面代码变成 computed 属性
    ${wxs
      .replace("/* eslint-disable */", "")
      .replace("var addUnit = require('../wxs/add-unit.wxs');", "")
      .replace("var style = require('../wxs/style.wxs');", "")}`
        : ""
    }
    </script>
    <style>
    ${css.replace("@import '../common/index.wxss';", "")}
    </style>
  `;
  const outPackageName = `van-${package}`;
  const outPackageDir = path.join(outDir, outPackageName);
  // 如果目录不存在则创建
  if (!fs.existsSync(outPackageDir)) {
    fs.mkdirSync(outPackageDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outPackageDir, `${outPackageName}.vue`), content);
  fs.writeFileSync(path.join(outPackageDir, `props.ts`), "");
};

const demoPackages = [];

const handleDemo = (package) => {
  const packageDir = path.join(packagesDir, package, "demo");
  const ts = safeGetFile(path.join(packageDir, "index.ts"));
  const wxml = safeGetFile(path.join(packageDir, "index.wxml"));
  const css = safeGetFile(path.join(packageDir, "index.less"));

  if (!wxml) {
    return;
  }

  const content = `
    <template>
    ${wxml
      .replace('<wxs src="../wxs/utils.wxs" module="utils" />', "")
      .replace('<wxs src="./index.wxs" module="computed" />', "")}
    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps, addUnit } from "../../utils";
    ${ts}
    </script>
    <style>
    ${css.replace("@import '../common/index.wxss';", "")}
    </style>
  `;
  const outPackageName = `van-${package}`;
  const outPackageDir = path.join(outDir, outPackageName);
  if (!fs.existsSync(outPackageDir)) {
    fs.mkdirSync(outPackageDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outPackageDir, `demo.vue`), content);

  // 生成 pages
  const pagesDir = path.join(__dirname, "..", "src", "pages");
  console.log("pagesDir", pagesDir, package);
  demoPackages.push(package);
  const outDemoPageDir = path.join(pagesDir, package);
  if (!fs.existsSync(outDemoPageDir)) {
    fs.mkdirSync(outDemoPageDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(outDemoPageDir, "index.vue"),
    `<template>
    <Page title="van-${package}">
      <Demo />
    </Page>
  </template>
  <script lang='ts' setup>
    // import Demo from '../../uni_modules/vant/components/van-${package}/demo.vue';
    import Demo from '../../uni_modules/demo/components/demo-page.vue';
    import Page from '../../uni_modules/demo/components/page.vue';
  </script>
  `
  );
};

const generatePageJson = () => {
  // 生成 pages.json
  const arr = demoPackages.map((package) => {
    return {
      path: `pages/${package}/index`,
      style: {
        navigationBarTitleText: `van-${package}`,
      },
    };
  });
  arr.unshift({
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "vant-weapp",
    },
  });
  const content = `
  {
  "pages": ${JSON.stringify(arr, null, 2)},
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  }
}
  `;
  fs.writeFileSync(path.join(__dirname, "..", "src", "pages.json"), content);
};

const generateIndex = () => {
  // 生成 src/pages/index/index.vue
  const indexPageContent = `
<template>
  <view class="index">
    <view class="index-title">vant-weapp</view>
    <view class="p-2 space-y-2">
      <navigator
        v-for="item in needHandle"
        :key="item"
        class="p-2 bg-white rounded-lg border border-solid border-slate-400"
        :url="'/pages/'+item+'/index'"
      >
        {{ item }}
      </navigator>
      <div class="h-2 bg-slate-200"></div>
      <navigator
        v-for="item in ok"
        :key="item"
       class="p-2 bg-white rounded-lg border border-solid border-slate-400"
        :url="'/pages/'+item+'/index'"
      >
       {{ item }}
      </navigator>
      </view>
    </view>
</template>
<script lang="ts" setup>
const ok = []
const needHandle = ${JSON.stringify(demoPackages, null, 2)};
</script>
     
`;
  fs.writeFileSync(
    path.join(__dirname, "..", "src", "pages", "index", "index.vue"),
    indexPageContent
  );
};

const main = () => {
  // 获取 packages 目录下的所有文件夹
  const packages = fs.readdirSync(packagesDir).filter((package) => {
    return !["common", "wxs", "definitions", "mixins"].includes(package);
  });

  // 遍历每个文件夹
  packages.forEach((package) => {
    handlePackage(package);
    handleDemo(package);
  });

  generatePageJson();
  generateIndex();
};
main();

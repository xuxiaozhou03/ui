const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "..", "vant-weapp-dev", "packages");
const distPath = path.join(__dirname, "..", "vant-weapp-dev", "dist");
const outputPath = path.join(
  __dirname,
  "..",
  "app/src/uni-modules/vant/components"
);

const directories = fs
  .readdirSync(dirPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .filter((name) => !["common", "definitions", "wxs"].includes(name));

async function requestGiteeAI({
  userPrompt,
  model = "Qwen2.5-Coder-32B-Instruct",
  max_tokens = 30000,
  temperature = 0.7,
  top_p = 0.7,
}) {
  const url = "https://ai.gitee.com/v1/chat/completions";
  const apiKey = "VRE6ZRYRZXSNIQVH58ZBHDM7BATGBCF9DVE0LL1V";
  const body = {
    messages: [
      {
        role: "system",
        content: `你是一个熟悉从微信小程序组件改写成vue3+typescript+setup的专家，有如下优化要求：
      1. 结构清晰，拆分 template、script、style；
      2. 类型安全，props、事件、插槽等用 typescript 明确类型；
      3. 计算属性和方法用 vue3 的方式实现（如使用 ref、computed、watch、defineProps、defineEmits 等）；
      4. 保留原有样式并适配 vue3；
      5. 组件 props、事件、插槽等用 vue3 语法表达；
      6. 优化代码结构和命名，提升可读性和可维护性；
      7. 保留原有功能逻辑，适配 vue3 生命周期和响应式系统；
      8. 输出完整的 vue3 单文件组件代码（.vue），并简要说明你的优化思路。`,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    model,
    stream: false,
    max_tokens,
    temperature,
    top_p,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
// 处理demo
const handlePackageDemo = (name) => {};

const getFileByPath = (filePath) => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf-8");
  }
  return null;
};

const outputFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`文件已保存到 ${filePath}`);
};

// 处理组件
const handlePackage = async (name) => {
  const packagePath = path.join(dirPath, name);
  const distPackagePath = path.join(distPath, name);

  const ts = getFileByPath(path.join(packagePath, "index.ts"));
  const wxml = getFileByPath(path.join(packagePath, "index.wxml"));
  const wxs = getFileByPath(path.join(packagePath, "index.wxs"));

  const wxss = getFileByPath(path.join(distPackagePath, "index.wxss"));

  const vue = `<template>
  ${wxml}
</template>
<script lang="ts" setup>
${ts || ""}
${wxs ? "// 下面是计算属性\n" + wxs : ""}
</script>
<style>
  ${wxss}
</style>`;
  const res = await requestGiteeAI({
    userPrompt:
      `请将以下微信小程序组件代码优化为 vue3 + typescript + setup 单文件组件，要求：\n` +
      `1. 不需要 @import '../common/index.wxss'；\n` +
      `2. 计算样式相关的 computed 属性需加 type CSSProperties 类型限制；\n` +
      `3. 结构清晰，拆分 template、script、style；\n` +
      `4. 类型安全，props、事件、插槽等用 typescript 明确类型；\n` +
      `5. props 期望用 {type: String, default: xx} 的格式，并且 props 定义放在同一文件；\n` +
      `6. 计算属性和方法用 vue3 的方式实现（如使用 ref、computed、watch、defineProps、defineEmits 等）；\n` +
      `7. 保留原有样式并适配 vue3；\n` +
      `8. 组件 props、事件、插槽等用 vue3 语法表达；\n` +
      `9. 优化代码结构和命名，提升可读性和可维护性；\n` +
      `10. 保留原有功能逻辑，适配 vue3 生命周期和响应式系统；\n` +
      `11. 只返回修改后的源代码，不需要解释。\n代码如下：\n` +
      vue,
  });
  console.log(res.choices[0].message.content);
  outputFile(
    path.resolve(outputPath, `${name}.vue`),
    res.choices[0].message.content
  );
};

const main = () => {
  // directories.forEach((name) => {
  //   handlePackage(name);
  // });
  handlePackage("button");
};

main();

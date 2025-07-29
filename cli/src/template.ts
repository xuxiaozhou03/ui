import { parseDocument } from "htmlparser2";
import { parseStyleValue } from "./parseStyle";
import { parseClassName } from "./parseClassName";

const replaceTemplate = (content: string) => {
  return content
    .replace('<wxs src="../wxs/utils.wxs" module="utils" />', "")
    .replace('<wxs src="./index.wxs" module="computed" />', "")
    .replace('<wxs src="./index.wxs" module="computed" />', "")
    .replace('<wxs src="./index.wxs" module="utils" />', "")
    .replace('<wxs src="./index.wxs" module="wxs" />', "")
    .replace('<wxs src="../wxs/style.wxs" module="style" />', "")
    .replace(/wxs./g, "")
    .trim();
};

const parseTag = (tag: string) => {
  const tagMap: Record<string, string> = {
    view: "div",
    block: "template",
    text: "span",
    image: "img",
  };
  return tagMap[tag] || tag;
};

const parseAttrKey = (key: string) => {
  const keyMap: Record<string, string> = {
    "wx:key": ":key",
    "wx:for": "v-for",
    "wx:if": "v-if",
    "wx:else": "v-else",
    "wx:elif": "v-else-if",
  };
  if (keyMap[key]) {
    return keyMap[key];
  }
  if (key.startsWith("bind:")) {
    key = key.replace("bind:", "@");
    return key;
  }
  if (key.startsWith("bind")) {
    key = key.replace("bind", "@");
    return key;
  }
  if (key.startsWith("capture-bind:")) {
    key = key.replace("capture-bind:", "@");
    return key;
  }
  if (key.startsWith("catch:")) {
    key = key.replace("catch:", "@");
    return key;
  }
  if (key.startsWith("catch")) {
    key = key.replace("catch", "@");
    return key;
  }
  return key;
};

export const addDynamicBinding = (newKey: string) => {
  if (
    !newKey.startsWith("@") &&
    !newKey.startsWith("v-") &&
    !newKey.startsWith(":")
  ) {
    return `:${newKey}`;
  }
  return newKey;
};

// 处理值
const parseAttrValue = (key: string, value: any) => {
  // 纯文本
  if (!value.includes("{{")) {
    return {
      [key]: value,
    };
  }

  // 纯变量
  // {{ !item.loading }}
  if (!value.includes("computed")) {
    value = value.slice(2, -2).trim();
    if (!isNaN(Number(value))) {
      value = Number(value);
    }
    return {
      [addDynamicBinding(key)]: value,
    };
  }

  const match = value.match(/computed\.([a-zA-Z0-9_]+)\s*\(/);
  const funcName = match ? match[1] : null;
  if (!funcName) {
    return {};
  }

  return {
    [addDynamicBinding(key)]: funcName,
  };
};

const parseAttr = (key: string, value: string) => {
  key = parseAttrKey(key);
  return parseAttrValue(key, value);
};

const parseAttrs = (attrs: Record<string, string>) => {
  let newAttrs: Record<string, any> = {};
  Object.entries(attrs).forEach(([key, value]) => {
    const noMap = ["wx:for-item", "wx:for-index"];
    if (noMap.includes(key)) {
      return;
    }
    if (key.includes("class")) {
      newAttrs = {
        ...newAttrs,
        ...parseClassName(key, value),
      };
      return;
    }
    if (key.includes("style")) {
      newAttrs = {
        ...newAttrs,
        [addDynamicBinding(key)]: parseStyleValue(value),
      };
      return;
    }

    newAttrs = {
      ...newAttrs,
      ...parseAttr(key, value),
    };
  });
  return newAttrs;
};

const nodeToAst = (node: any): any => {
  if (node.type === "tag" || node.type === "script" || node.type === "style") {
    if (["wxs", "include", "import"].includes(node.name)) {
      return null;
    }
    const tag = parseTag(node.name);
    const ast = {
      tag,
      attrs: parseAttrs(node.attribs || {}),
      children: node.children
        ? node.children.map((child: any) => nodeToAst(child)).filter(Boolean)
        : [],
    };
    if (ast.children?.length === 0) {
      delete ast.children; // Remove empty children array
    }
    return ast;
  }
  return null;
};

const generateTemplate = (content: string) => {
  const tree = parseDocument(replaceTemplate(content), { xmlMode: false });

  const asts = tree.children
    .map((node: any) => nodeToAst(node))
    .filter(Boolean);
  return asts;
};
export default generateTemplate;

import { parseDocument } from "htmlparser2";
import parseClass from "./parseClass";

interface WxmlNode {
  tag: string;
  attrs?: Record<string, string>;
  children?: WxmlNode[];
}

// todo 处理复杂的class 语法
// todo 处理 style， 从字符串改成对象

const parseAttrs = (attrs: any, isCustomElement: boolean) => {
  if (isCustomElement) {
    if (attrs["custom-class"] && attrs.class) {
      attrs["custom-class"] = `${attrs.class} ${attrs["custom-class"]}`;
      delete attrs.class;
    }
  }

  const newAttrs = Object.entries(attrs).reduce(
    (acc: Record<string, string>, [key, value]: [string, any]) => {
      const map = {
        "wx:for": "v-for",
        "wx:for-item": "v-for-item",
        "wx:for-index": "v-for-index",
        "wx:key": ":key",
        "wx:if": "v-if",
        "wx:else": "v-else",
        "wx:elif": "v-else-if",
      } as Record<string, string>;
      if (map[key]) {
        key = map[key];
      }

      if (key.startsWith("bind:")) {
        key = key.replace("bind:", "@");
      }
      if (key.startsWith("bind")) {
        key = key.replace("bind", "@");
      }
      if (key.startsWith("catch")) {
        key = key.replace("catch", "@catch");
      }

      if (value.startsWith("{{") && value.endsWith("}}")) {
        value = value.slice(2, -2).trim();
        if (
          !key.startsWith("v-") &&
          !key.startsWith(":") &&
          !key.startsWith("@")
        ) {
          key = `:${key}`;
        }
      }
      if (value.startsWith("computed.")) {
        const match = value.match(/^computed\.(\w+)\s*\((.*)\)$/);
        if (match) {
          value = match[1];
          if (
            !key.startsWith("v-") &&
            !key.startsWith(":") &&
            !key.startsWith("@")
          ) {
            key = `:${key}`;
          }
        }
      }

      if (key.includes("class")) {
        const obj = parseClass(key, value);
        acc = { ...acc, ...obj };
        return acc;
      }
      acc[key] = value;
      return acc;
    },
    {} as any
  );
  return newAttrs;
};
const parseTag = (tag: string): string => {
  const tagMap = {
    block: "template",
    view: "div",
  } as Record<string, string>;
  return tagMap[tag] || tag;
};
const parseWxml = (wxml: string): WxmlNode[] => {
  const ast = parseDocument(wxml, { xmlMode: true });
  const result: WxmlNode[] = [];

  const extractNode = (node: any): WxmlNode | null => {
    if (node.type === "tag" && node.name !== "wxs") {
      let children: WxmlNode[] = [];
      if (
        node.children &&
        Array.isArray(node.children) &&
        node.children.length > 0
      ) {
        children = node.children.map(extractNode).filter(Boolean) as WxmlNode[];
      }
      const tag = parseTag(node.name);
      const resultNode: WxmlNode = {
        tag,
        attrs: parseAttrs(node.attribs || {}, tag.includes("-")),
        children,
      };
      if (children.length === 0) {
        resultNode.children = undefined;
      }
      if (Object.keys(resultNode.attrs!).length === 0) {
        resultNode.attrs = undefined;
      }
      return resultNode;
    }
    return null;
  };

  if (ast.children && Array.isArray(ast.children)) {
    ast.children.forEach((child: any) => {
      const n = extractNode(child);
      if (n) result.push(n);
    });
  }
  return result;
};

const generateTemplateByNodes = (nodes: WxmlNode[]): string => {
  return nodes
    .map((node) => {
      const attrs = node.attrs
        ? Object.entries(node.attrs)
            .map(([key, value]) => {
              return ` ${key}="${value}"`;
            })
            .join("")
        : "";
      const children = node.children
        ? generateTemplateByNodes(node.children)
        : "";
      return `<${node.tag}${attrs}>${children}</${node.tag}>`;
    })
    .join("");
};
export const generateTemplate = (wxml: string) => {
  const nodes = parseWxml(wxml);
  return generateTemplateByNodes(nodes);
};

import { parseDocument } from "htmlparser2";

interface WxmlNode {
  tag: string;
  attrs?: Record<string, string>;
  children?: WxmlNode[];
}

const parseAttrs = (attrs: any, tag: string) => {
  const newAttrs = Object.entries(attrs).reduce(
    (acc: Record<string, string>, [key, value]: [string, any]) => {
      if (key.startsWith("bind")) {
        key = key.replace("bind", "@");
      }

      const map = {
        "wx:for": "v-for",
        "wx:for-item": "v-for-item",
        "wx:for-index": "v-for-index",
        "wx:key": "v-key",
        "wx:if": "v-if",
        "wx:else": "v-else",
        "wx:elif": "v-else-if",
      } as Record<string, string>;
      if (map[key]) {
        key = map[key];
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
export const parseWxml = (wxml: string): WxmlNode[] => {
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
        attrs: parseAttrs(node.attribs || {}, tag),
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

import { parseDocument } from "htmlparser2";

interface WxmlNode {
  tag: string;
  attrs?: Record<string, string>;
  children?: WxmlNode[];
}
function splitClassNames(str: string) {
  const dynamicMatches = [...str.matchAll(/\{\{[^}]+\}\}/g)];
  // 用占位符替换动态表达式
  let replaced = str;
  dynamicMatches.forEach((m, i) => {
    replaced = replaced.replace(m[0], `__DYNAMIC_${i}__`);
  });
  // 按空格分割
  const parts = replaced.split(/\s+/).filter(Boolean);
  // 恢复动态表达式
  return parts.map((p: any) => {
    if (p.startsWith("__DYNAMIC_")) {
      const idx = Number(p.match(/\d+/)[0]);
      return dynamicMatches[idx][0];
    }
    return p;
  });
}
const parseClass = (key: string, value: string) => {
  // // 处理纯文本
  // if (!value.includes("{{") && !value.includes("bem") && !value.includes("?")) {
  //   let classes = value.split(" ").filter(Boolean);
  //   let isVar = false;
  //   classes = classes
  //     .filter(Boolean)
  //     .map((cls) => {
  //       if (cls.includes("-class")) {
  //         isVar = true;
  //         const newCls = cls.split("-").reduce((acc, part, index) => {
  //           if (index === 0) {
  //             return acc + part;
  //           }
  //           return acc + part.charAt(0).toUpperCase() + part.slice(1);
  //         }, "");
  //         return newCls;
  //       }
  //       return cls;
  //     })
  //     .sort((a, b) => {
  //       if (a.includes("Class")) {
  //         return 1;
  //       }
  //       if (b.includes("Class")) {
  //         return -1;
  //       }
  //       return 1;
  //     });
  //   if (isVar) {
  //     key = `:${key}`;
  //     value = classes
  //       .map((cls) => {
  //         if (cls.includes("Class")) {
  //           return cls.replace("Class", "class");
  //         }
  //         return `'${cls}'`;
  //       })
  //       .join(", ");
  //     value = `cn(${value})`;
  //   } else {
  //     value = classes.join(" ");
  //   }
  //   return { [key]: value };
  // }

  // if (value.includes("{{") && !value.includes("utils")) {
  //   const data = splitClassNames(value);
  //   console.log(data, value);
  // }

  console.log("parseClass", splitClassNames(value));

  return {
    [key]: value,
  };
};

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

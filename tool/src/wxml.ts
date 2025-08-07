import { getFileContent } from "./utils";
import * as path from "path";
// @ts-ignore
import { parse } from "@wxml/parser";

interface WxmlAttr {
  key: string;
  value: string;
  children: Array<{
    type: string;
    value: string;
  }>;
}
interface WxmlAts {
  type: string;
  name: string;
  value?: string;
  children?: WxmlAts[];
  rawValue?: string;
  startTag?: {
    attributes: WxmlAttr[];
  };
}

type AstAttrs = Record<string, string | Array<{ type: string; value: string }>>;

// 过渡的 AST 接口
interface TransitionAstNode {
  tag: string;
  attrs?: AstAttrs;
  children?: TransitionAstNode[] | string;
}

interface Ast {
  tag: string;
  attrs?: Record<string, string>;
  children?: Ast[] | string;
}

class Wxml {
  asts: Ast[] = [];

  constructor(packagePath: string) {
    const wxml = getFileContent(path.join(packagePath, "index.wxml"));
    const transitionAsts = this.parseToAst(wxml);
    this.asts = this.transformAsts(transitionAsts || []);
  }

  parseToAst(wxml: string) {
    if (!wxml) return;
    const originAsts = parse(wxml).body as WxmlAts[];
    return this.parseElements(originAsts)!;
  }

  parseAttrs(attr?: WxmlAttr[]): AstAttrs | undefined {
    if (!attr) return undefined;
    const newAttrs = attr.reduce((acc: AstAttrs, { key, value, children }) => {
      if (children && children.length > 0) {
        acc[key] = children.map((child) => ({
          type: child.type,
          value: child.value.trim(),
        }));
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
    if (Object.keys(newAttrs).length === 0) {
      return undefined;
    }
    return newAttrs;
  }

  parseElement(element: WxmlAts): TransitionAstNode | false {
    if (element.type === "WXScript" || element.type === "WXComment") {
      return false;
    }
    if (element.type === "WXText") {
      if (!element.value?.replace(/\n/g, "").trim()) {
        return false;
      }
    }
    if (element.type === "WXInterpolation") {
      return {
        tag: "WXInterpolation",
        children: element.rawValue,
      };
    }
    if (element.type === "WXText") {
      return {
        tag: "WXText",
        children: element.value,
      };
    }

    const tag = element.name;
    const attrs = this.parseAttrs(element.startTag?.attributes);
    const children = this.parseElements(element.children || []);
    return {
      tag,
      attrs,
      children,
    };
  }

  parseElements(elements: WxmlAts[]) {
    const children = elements
      .map((element) => this.parseElement(element))
      .filter(Boolean) as TransitionAstNode[];
    if (children.length === 0) {
      return undefined;
    }
    return children;
  }

  transformTag(tag: string): string {
    const tagMap: Record<string, string> = {
      view: "div",
      text: "span",
      image: "img",
      block: "template",
    };
    if (tagMap[tag]) {
      return tagMap[tag];
    }
    return tag;
  }

  transformAttrKey(key: string, dynamic = false): string {
    const keyMap: Record<string, string> = {
      "wx:if": "v-if",
      "wx:else": "v-else",
      "wx:elif": "v-else-if",
      "wx:for": "v-for",
      "wx:key": ":key",
    };
    if (keyMap[key]) {
      return keyMap[key];
    }

    if (key.startsWith("bind:")) {
      return `@${key.slice(5)}`;
    }

    if (key.startsWith("bind")) {
      return `@${key.slice(4)}`;
    }

    if (dynamic) {
      return `:${key}`;
    }
    return key;
  }

  transformProp(key: string, value: string | null, isDynamic = false) {
    const passKeys = ["wx:for-item", "wx:for-index"];
    if (passKeys.includes(key)) {
      return {};
    }

    if (!isDynamic) {
      if (value?.includes("computed.")) {
        isDynamic = true;
      }
    }
    return {
      [this.transformAttrKey(key, isDynamic)]: this.transformAttrValue(value),
    };
  }

  transformAttrValue(value: string | null) {
    if (value === null) {
      return null;
    }
    if (value.includes("utils.bem")) {
      return value.replace("utils.bem", "bem");
    }
    if (value.includes("utils.addUnit")) {
      return value.replace("utils.addUnit", "addUnit");
    }
    if (value.includes("computed.")) {
      const match = value.match(/computed\.(\w+)/);
      if (match) {
        return match[1];
      }
    }
    return value;
  }

  transformAttr(
    key: string,
    value: string | Array<{ type: string; value: string }>
  ) {
    if (value === null) {
      return this.transformProp(key, null);
    }
    if (typeof value === "string") {
      return this.transformProp(key, value);
    }

    if (!Array.isArray(value)) {
      return {};
    }

    if (value.length === 1) {
      if (value[0].type === "WXAttributeInterpolation") {
        return this.transformProp(key, value[0].value, true);
      }

      return {};
    }

    if (key.includes("class")) {
      const arr: string[] = [];
      value.forEach((item) => {
        if (item.type === "WXText") {
          if (item.value) {
            arr.push(`'${item.value}'`);
          }
        } else if (item.type === "WXAttributeInterpolation") {
          const val = this.transformAttrValue(item.value);
          if (val) {
            arr.push(val);
          }
        }
      });
      value = `cn(${arr.filter(Boolean).join(", ")})`;
      return this.transformProp(key, value, true);
    } else if (key.includes("style")) {
      if (value.length === 2) {
        if (
          value[0].type === "WXText" &&
          value[1].type === "WXAttributeInterpolation"
        ) {
          value = `{${value[0].value
            .trim()
            .replace(/;$/, "")} ${this.transformAttrValue(value[1].value)}}`;
          return this.transformProp(key, value, true);
        }
      }

      const arr: string[] = [];
      let temp = "";
      value.forEach((item) => {
        if (item.type === "WXText") {
          if (item.value === ";") {
            // 结束
            arr.push(temp);
            temp = "";
            return;
          }
          if (item.value.startsWith(";")) {
            arr.push(temp);
            // 开始新的对成关系
            temp = item.value.slice(1).replace(":", "").trim();
            return;
          }
          if (item.value.includes(":")) {
            temp = item.value;
            return;
          }
          const hasClose = item.value.endsWith(";");
          if (temp.includes(":")) {
            temp += ` + '${item.value.replace(";", "")}'`;
          } else {
            temp += item.value.replace(";", "");
          }

          if (hasClose) {
            if (temp) {
              arr.push(temp);
            }
            temp = "";
          }
          return;
        }
        if (temp === "") {
          let val = item.value;
          if (val.includes("computed.")) {
            // computed.barStyle({ zIndex, statusBarHeight, safeAreaInsetTop })
            // 只要 barStyle
            const match = val.match(/computed\.(\w+)/);
            if (match) {
              val = match[1]; // 获取 barStyle
            }
          } else if (val.includes("style(")) {
            const match = val.match(/style\(([^)]+)\)/);
            if (match) {
              val = `(${match[1]})`; // 获取括号内的内容
            }
          }

          arr.push(`...${val}`);
          return;
        }
        temp += item.value;
      });

      const newValue = arr.filter(Boolean).join(",");

      return this.transformProp(key, `{${newValue}}`, true);
    }

    return {};
  }

  transformAttrs(attrs: AstAttrs | undefined): Record<string, string | null> {
    if (!attrs) return {};

    return Object.entries(attrs).reduce(
      (acc: Record<string, string | null>, [key, value]) => {
        return {
          ...acc,
          ...this.transformAttr(key, value),
        };
      },
      {}
    );
  }

  transformAst(ast: TransitionAstNode): Ast {
    const tag = this.transformTag(ast.tag);
    let children: undefined | Ast[] | string;

    if (!ast.children) {
      children = undefined;
    } else if (typeof ast.children === "string") {
      children = ast.children;
    } else if (Array.isArray(ast.children)) {
      children = ast.children.map((child) => this.transformAst(child));
    }

    let attrs: Record<string, string | null> | undefined;
    if (ast.attrs) {
      attrs = this.transformAttrs(ast.attrs);
    }

    return {
      // ...ast,
      tag,
      children,
      attrs,
    } as Ast;
  }

  transformAsts(asts: TransitionAstNode[]): Ast[] {
    return asts.map((ast) => this.transformAst(ast));
  }
}

export default Wxml;

import * as fs from "fs";
import * as path from "path";
import { parseDocument } from "htmlparser2";

class Wxml {
  ast: any;
  constructor(public content: string) {
    this.ast = parseDocument(this.content, { xmlMode: false });
  }

  private getTagName(tag: string) {
    const map: Record<string, string> = {
      view: "div",
      block: "span",
    };
    tag = map[tag] || tag;

    return tag;
  }

  parseAttr(key: string, value: string) {
    const addDynamicBinding = (newKey: string) => {
      if (
        !newKey.startsWith("@") &&
        !newKey.startsWith("v-") &&
        !newKey.startsWith(":")
      ) {
        return `:${newKey}`;
      }
      return newKey;
    };
    const keyMap: Record<string, string> = {
      "wx:key": ":key",
      "wx:for": "v-for",
      "wx:if": "v-if",
      "wx:else": "v-else",
      "wx:elif": "v-else-if",
    };
    key = keyMap[key] || key;

    if (key.startsWith("bind:")) {
      key = key.replace("bind:", "@");
    }
    if (key.startsWith("bind")) {
      key = key.replace("bind", "@");
    }

    if (value.startsWith("{{") && value.endsWith("}}")) {
      value = value.slice(2, -2).trim();
      key = addDynamicBinding(key);
    }

    return {
      [key]: value,
    };
  }

  parseAttrs(attrs: Record<string, string>) {
    let newAttrs: Record<string, any> = {};
    Object.keys(attrs).forEach((key) => {
      newAttrs = {
        ...newAttrs,
        ...this.parseAttr(key, attrs[key]),
      };
    });

    return newAttrs;
  }

  nodeToAst(node: any): any {
    if (
      node.type === "tag" ||
      node.type === "script" ||
      node.type === "style"
    ) {
      const tagName = this.getTagName(node.name);
      const ast = {
        tag: tagName,
        attrs: this.parseAttrs(node.attribs || {}),
        children: node.children
          ? node.children
              .map((child: any) => this.nodeToAst(child))
              .filter(Boolean)
          : [],
      };
      if (ast.children?.length === 0) {
        delete ast.children; // Remove empty children array
      }
      return ast;
    }
    return null;
  }

  get asts() {
    return this.ast.children
      .map((node: any) => this.nodeToAst(node))
      .filter(Boolean);
  }

  get template() {
    // 可根据 tags 结构生成 vue template，这里先返回 JSON 字符串用于调试
    return JSON.stringify(this.asts, null, 2);
  }
}

class Ts {
  constructor(public content: string) {}

  get script() {
    return "";
  }
}

class Package {
  constructor(
    public name: string,
    public content: { wxml: string; ts: string; wxs: string; wxss: string }
  ) {
    this.generate();
  }
  generate() {
    const outputDir = path.join(__dirname, "..", "..", "output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    // const vue = `
    // <template>${this.template}</template>
    // <script lang="ts" setup>
    // ${this.ts}
    // </script>
    // <style>${this.wxss}</style>
    // `;
    const vue = this.template;
    fs.writeFileSync(path.join(outputDir, this.name + ".json"), vue);
  }

  get template() {
    const wxml = this.content.wxml
      .replace('<wxs src="../wxs/utils.wxs" module="utils" />', "")
      .replace('<wxs src="./index.wxs" module="computed" />', "")
      .replace('<wxs src="./index.wxs" module="computed" />', "")
      .trim();
    return new Wxml(wxml).template;
  }
  get ts() {
    return new Ts(this.content.ts).script;
  }
  get wxss() {
    return this.content.wxss.replace("@import '../common/index.wxss';", "");
  }
}

class Transform {
  packagesPath: string;
  constructor() {
    this.packagesPath = path.resolve(
      __dirname,
      "../../vant-weapp-dev/packages"
    );

    this.run();
  }

  run() {
    const getFileContent = (filePath: string): string => {
      try {
        return fs.readFileSync(filePath, "utf-8");
      } catch (error) {
        return "";
      }
    };
    this.packages.forEach((packageName) => {
      const packagePath = path.join(this.packagesPath, packageName);
      const wxml = getFileContent(path.join(packagePath, "index.wxml"));
      const ts = getFileContent(path.join(packagePath, "index.ts"));
      const wxs = getFileContent(path.join(packagePath, "index.wxs"));
      const buildPath = path.resolve(__dirname, "../../vant-weapp-dev/build");
      const wxss = getFileContent(
        path.join(buildPath, packageName, "index.wxss")
      );
      new Package(packageName, {
        wxml,
        ts,
        wxs,
        wxss,
      });
    });
  }

  get packages() {
    return fs.readdirSync(this.packagesPath).filter((name) => {
      if (["wxs", "definitions", "common", "mixins"].includes(name)) {
        return false;
      }
      const fullPath = path.join(this.packagesPath, name);
      return fs.statSync(fullPath).isDirectory();
    });
  }
}

new Transform();

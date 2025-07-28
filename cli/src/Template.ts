import Attrs from "./Attrs";
import provider from "./PathProvider";
import { parseDocument } from "htmlparser2";

interface AstNode {
  tag: string;
  attrs?: Record<string, string>;
  children?: AstNode[];
}

class Template {
  name: string;

  constructor(name: string) {
    this.name = name;
    let fileContent = provider.getFileContent(name + "/index.wxml");
    if (fileContent) {
      const ast = this.parse(fileContent);
      provider.setFileContent(
        this.name + ".json",
        JSON.stringify(ast, null, 2)
      );
    }
  }

  parseTag(tag: string): string {
    const map = {
      block: "template",
      view: "div",
      image: "img",
    } as Record<string, string>;
    if (map[tag]) {
      return map[tag];
    }

    return tag;
  }

  isCustomComponent(tag: string): boolean {
    return tag.includes("-");
  }

  parse = (wxml: string): AstNode[] => {
    const ast = parseDocument(wxml, { xmlMode: true });
    const asts: AstNode[] = [];

    const extractNode = (node: any): AstNode | null => {
      if (node.type === "tag" && node.name !== "wxs") {
        let children: AstNode[] = [];
        if (
          node.children &&
          Array.isArray(node.children) &&
          node.children.length > 0
        ) {
          children = node.children
            .map(extractNode)
            .filter(Boolean) as AstNode[];
        }
        const tag = this.parseTag(node.name);
        const attrs = new Attrs(
          node.attribs || {},
          this.isCustomComponent(tag)
        );
        const resultNode: AstNode = {
          tag,
          attrs: attrs.config,
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
        if (n) asts.push(n);
      });
    }

    return asts;
  };
}

export default Template;

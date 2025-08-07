import { getFileContent } from "./utils";
import * as path from "path";
import * as typescript from "typescript";

// 定义结构化 AST 节点接口
interface AstNode {
  kind: string; // 节点类型名称
  kindNumber: typescript.SyntaxKind; // 节点类型编号
  text: string; // 节点的完整文本
  start: number; // 起始位置
  end: number; // 结束位置
  children: AstNode[]; // 子节点
  // 可选的特定类型属性
  name?: string; // 标识符名称、函数名、变量名等
  value?: string; // 字面量值
  moduleSpecifier?: string; // 导入模块路径
}

interface TsData {
  classes: [];
  props: {};
  methods: {};
  data: {};
  created: {};
  watch: {};
}

class Script {
  astTree: AstNode[];
  constructor(packagePath: string) {
    // 获取结构化的 AST
    this.astTree = this.getAst(packagePath).children;
  }

  // 获取结构化的树形 AST
  getAst(packagePath: string): AstNode {
    const ts = getFileContent(path.join(packagePath, "index.ts"));
    const sourceFile = typescript.createSourceFile(
      "index.ts",
      ts,
      typescript.ScriptTarget.Latest,
      true
    );
    return this.nodeToAstNode(sourceFile);
  }

  // 将 TypeScript 节点转换为结构化的 AST 节点
  private nodeToAstNode(node: typescript.Node): AstNode {
    const astNode: AstNode = {
      kind: typescript.SyntaxKind[node.kind],
      kindNumber: node.kind,
      text: node.getText(),
      start: node.getStart(),
      end: node.getEnd(),
      children: [],
    };

    // 添加特定节点类型的额外信息
    if (typescript.isIdentifier(node)) {
      astNode.name = node.text;
    } else if (
      typescript.isStringLiteral(node) ||
      typescript.isNumericLiteral(node)
    ) {
      astNode.value = node.text;
    } else if (typescript.isFunctionDeclaration(node)) {
      astNode.name = node.name?.text;
    } else if (typescript.isVariableDeclaration(node)) {
      astNode.name = typescript.isIdentifier(node.name)
        ? node.name.text
        : undefined;
    } else if (typescript.isImportDeclaration(node)) {
      astNode.moduleSpecifier = node.moduleSpecifier
        ? node.moduleSpecifier.getText().slice(1, -1)
        : undefined;
    }

    // 递归处理子节点
    typescript.forEachChild(node, (child) => {
      astNode.children.push(this.nodeToAstNode(child));
    });

    return astNode;
  }
}

export default Script;

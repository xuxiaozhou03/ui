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

class Script {
  astTree: AstNode[];
  constructor(packagePath: string) {
    // 获取结构化的 AST
    this.astTree = this.getAst(packagePath).children;
  }

  // 递归打印 AST 节点（原来的方法，保留作为备用）
  private printAst(node: typescript.Node, depth: number = 0) {
    const indent = "  ".repeat(depth);

    // 如果是标识符或字面量，打印其文本
    if (typescript.isIdentifier(node)) {
      console.log(`${indent}  text: "${node.text}"`);
    } else if (
      typescript.isStringLiteral(node) ||
      typescript.isNumericLiteral(node)
    ) {
      console.log(`${indent}  text: "${node.text}"`);
    }

    // 递归处理子节点
    typescript.forEachChild(node, (child) => {
      this.printAst(child, depth + 1);
    });
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

  // 从 AST 树重新生成代码
  generateCode(astNode: AstNode): string {
    return this.generateCodeFromAstNode(astNode);
  }

  // 递归生成代码
  private generateCodeFromAstNode(astNode: AstNode): string {
    // 对于叶子节点或简单节点，直接返回其文本
    if (astNode.children.length === 0) {
      return astNode.text;
    }

    // 对于有子节点的复合节点，根据节点类型生成代码
    let code = "";

    switch (astNode.kind) {
      case "SourceFile":
        // 源文件：连接所有子节点
        code = astNode.children
          .map((child) => this.generateCodeFromAstNode(child))
          .join("");
        break;

      case "ImportDeclaration":
        // 导入声明：重新构建 import 语句
        code = astNode.text;
        break;

      case "FunctionDeclaration":
        // 函数声明：重新构建函数
        code = astNode.text;
        break;

      case "VariableStatement":
        // 变量声明语句
        code = astNode.text;
        break;

      default:
        // 默认情况：使用原始文本或连接子节点
        if (astNode.text.trim()) {
          code = astNode.text;
        } else {
          code = astNode.children
            .map((child) => this.generateCodeFromAstNode(child))
            .join("");
        }
    }

    return code;
  }

  // 查找特定类型的节点
  findNodes(astNode: AstNode, kind: string): AstNode[] {
    const result: AstNode[] = [];

    if (astNode.kind === kind) {
      result.push(astNode);
    }

    astNode.children.forEach((child) => {
      result.push(...this.findNodes(child, kind));
    });

    return result;
  }

  // 修改节点（例如重命名标识符）
  modifyNode(astNode: AstNode, modifications: { [key: string]: any }): AstNode {
    const modified = { ...astNode };

    // 应用修改
    Object.keys(modifications).forEach((key) => {
      (modified as any)[key] = modifications[key];
    });

    // 递归修改子节点
    modified.children = astNode.children.map((child) =>
      this.modifyNode(child, modifications)
    );

    return modified;
  }

  // 将结构化 AST 转换回 TypeScript SourceFile（用于复杂操作）
  private astNodeToSourceFile(astNode: AstNode): typescript.SourceFile {
    // 重新生成代码，然后解析为新的 SourceFile
    const generatedCode = this.generateCode(astNode);
    return typescript.createSourceFile(
      "generated.ts",
      generatedCode,
      typescript.ScriptTarget.Latest,
      true
    );
  }
}

export default Script;

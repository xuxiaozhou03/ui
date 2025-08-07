import Script from "./script";

// 示例：如何使用结构化 AST
function exampleUsage() {
  // 假设你有一个包含 index.ts 的包路径
  const packagePath = "/path/to/your/package";

  // 创建 Script 实例
  const script = new Script(packagePath);

  // 获取结构化 AST
  const ast = script.getAst(packagePath);

  // 1. 查找所有导入声明
  const imports = script.findNodes(ast, "ImportDeclaration");
  console.log("找到的导入声明:", imports.length);
  imports.forEach((imp) => {
    console.log(`- 导入模块: ${imp.moduleSpecifier}`);
  });

  // 2. 查找所有函数声明
  const functions = script.findNodes(ast, "FunctionDeclaration");
  console.log("找到的函数:", functions.length);
  functions.forEach((func) => {
    console.log(`- 函数名: ${func.name}`);
  });

  // 3. 查找所有变量声明
  const variables = script.findNodes(ast, "VariableDeclaration");
  console.log("找到的变量:", variables.length);
  variables.forEach((variable) => {
    console.log(`- 变量名: ${variable.name}`);
  });

  // 4. 重新生成代码
  const regeneratedCode = script.generateCode(ast);
  console.log("重新生成的代码:");
  console.log(regeneratedCode);

  // 5. 修改 AST（示例：可以用来重命名等）
  // 注意：这只是示例，实际的修改需要更复杂的逻辑
  const modifiedAst = script.modifyNode(ast, {
    // 这里可以添加你想要的修改
  });

  return {
    originalAst: ast,
    imports,
    functions,
    variables,
    regeneratedCode,
    modifiedAst,
  };
}

// 高级用法示例：遍历和转换 AST
function advancedAstManipulation(ast: any) {
  // 深度优先遍历 AST
  function traverse(node: any, visitor: (node: any) => void) {
    visitor(node);
    if (node.children) {
      node.children.forEach((child: any) => traverse(child, visitor));
    }
  }

  // 收集所有标识符
  const identifiers: string[] = [];
  traverse(ast, (node) => {
    if (node.kind === "Identifier" && node.name) {
      identifiers.push(node.name);
    }
  });

  console.log("所有标识符:", identifiers);

  // 转换 AST（例如：重命名所有变量）
  function transformAst(node: any): any {
    const transformed = { ...node };

    // 如果是标识符且名称匹配某个模式，则重命名
    if (node.kind === "Identifier" && node.name) {
      // 例如：给所有变量名添加前缀
      if (node.name.startsWith("old")) {
        transformed.name = node.name.replace("old", "new");
        transformed.text = transformed.name;
      }
    }

    // 递归转换子节点
    if (node.children) {
      transformed.children = node.children.map(transformAst);
    }

    return transformed;
  }

  return transformAst(ast);
}

export { exampleUsage, advancedAstManipulation };

import * as ts from "typescript";

function serializeAst(node: ts.Node): any {
  if (!node) return null;
  const obj: any = { kind: ts.SyntaxKind[node.kind], text: node.getText() };
  if ((node as any).name) obj.name = (node as any).name.getText();
  if ((node as any).expression) {
    obj.expression = (node as any).expression.getText();
    // 细化 VantComponent 调用
    if (
      ts.isCallExpression((node as any).expression) &&
      (node as any).expression.expression.getText() === "VantComponent"
    ) {
      const callExpr = (node as any).expression as ts.CallExpression;
      obj.callee = callExpr.expression.getText();
      obj.arguments = callExpr.arguments.map((arg: ts.Expression) => {
        if (ts.isObjectLiteralExpression(arg)) {
          // 递归解析对象参数
          const parseObj = (objExpr: ts.ObjectLiteralExpression): any => {
            const result: any = {};
            objExpr.properties.forEach((prop) => {
              if (ts.isPropertyAssignment(prop)) {
                const key = prop.name.getText();
                let value: any;
                // methods 特殊处理
                if (
                  key === "methods" &&
                  ts.isObjectLiteralExpression(prop.initializer)
                ) {
                  value = {};
                  prop.initializer.properties.forEach((m) => {
                    if (ts.isMethodDeclaration(m)) {
                      value[m.name.getText()] = m.getText();
                    } else if (
                      ts.isPropertyAssignment(m) &&
                      (ts.isFunctionExpression(m.initializer) ||
                        ts.isArrowFunction(m.initializer))
                    ) {
                      value[m.name.getText()] = m.initializer.getText();
                    }
                  });
                } else if (ts.isObjectLiteralExpression(prop.initializer)) {
                  value = parseObj(prop.initializer);
                } else if (ts.isArrayLiteralExpression(prop.initializer)) {
                  value = prop.initializer.elements.map((e) => e.getText());
                } else if (
                  ts.isStringLiteral(prop.initializer) ||
                  ts.isNumericLiteral(prop.initializer)
                ) {
                  value = prop.initializer.text;
                } else if (
                  ts.isFunctionExpression(prop.initializer) ||
                  ts.isArrowFunction(prop.initializer)
                ) {
                  value = prop.initializer.getText();
                } else {
                  value = prop.initializer.getText();
                }
                result[key] = value;
              }
            });
            return result;
          };
          return parseObj(arg);
        }
        return arg.getText();
      });
    }
  }
  if ((node as any).initializer)
    obj.initializer = (node as any).initializer.getText();
  if ((node as any).condition)
    obj.condition = (node as any).condition.getText();
  if ((node as any).thenStatement) {
    const tsNode = (node as any).thenStatement;
    if (Array.isArray(tsNode.statements)) {
      obj.thenStatement = tsNode.statements.map((stmt: ts.Node) =>
        serializeAst(stmt)
      );
    } else {
      obj.thenStatement = serializeAst(tsNode);
    }
  }
  if ((node as any).elseStatement) {
    const esNode = (node as any).elseStatement;
    if (Array.isArray(esNode.statements)) {
      obj.elseStatement = esNode.statements.map((stmt: ts.Node) =>
        serializeAst(stmt)
      );
    } else {
      obj.elseStatement = serializeAst(esNode);
    }
  }
  if (Array.isArray((node as any).statements))
    obj.statements = (node as any).statements.map((stmt: ts.Node) =>
      serializeAst(stmt)
    );

  // 只保留第一级节点，不递归 children
  // 返回根节点的 statements（即源码的顶层结构）
  if (
    node === node.getSourceFile() &&
    Array.isArray((node as any).statements)
  ) {
    obj.statements = (node as any).statements.map((stmt: ts.Node) =>
      serializeAst(stmt)
    );
  }
  return obj;
}

const parseTs = (tsCode: string) => {
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    tsCode,
    ts.ScriptTarget.Latest,
    true
  );
  const ast = serializeAst(sourceFile);
  if (!ast) {
    return "";
  }
  return ast.statements.filter(
    (item: any) => !item.text.includes("import { VantComponent }")
  );
};

export const generateScript = (tsCode: string): string => {
  const asts = parseTs(tsCode);
  console.log(asts);
  return `
  import { cn, bem } from '../../utils';
  `;
};

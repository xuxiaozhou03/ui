import * as ts from "typescript";

function serializeAst(node: ts.Node): any {
  if (!node) return null;
  const obj: any = { kind: ts.SyntaxKind[node.kind], text: node.getText() };
  if ((node as any).name) obj.name = (node as any).name.getText();
  if ((node as any).expression)
    obj.expression = (node as any).expression.getText();
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

  // 递归遍历所有子节点
  const children: ts.Node[] = node.getChildren();
  if (children && children.length > 0) {
    obj.children = children.map(serializeAst);
  }
  return obj;
}

export const parseTs = (tsCode: string) => {
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    tsCode,
    ts.ScriptTarget.Latest,
    true
  );
  return serializeAst(sourceFile);
};

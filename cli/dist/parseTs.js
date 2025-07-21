"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTs = void 0;
const ts = __importStar(require("typescript"));
function serializeAst(node) {
    if (!node)
        return null;
    const obj = { kind: ts.SyntaxKind[node.kind], text: node.getText() };
    if (node.name)
        obj.name = node.name.getText();
    if (node.expression)
        obj.expression = node.expression.getText();
    if (node.initializer)
        obj.initializer = node.initializer.getText();
    if (node.condition)
        obj.condition = node.condition.getText();
    if (node.thenStatement) {
        const tsNode = node.thenStatement;
        if (Array.isArray(tsNode.statements)) {
            obj.thenStatement = tsNode.statements.map((stmt) => serializeAst(stmt));
        }
        else {
            obj.thenStatement = serializeAst(tsNode);
        }
    }
    if (node.elseStatement) {
        const esNode = node.elseStatement;
        if (Array.isArray(esNode.statements)) {
            obj.elseStatement = esNode.statements.map((stmt) => serializeAst(stmt));
        }
        else {
            obj.elseStatement = serializeAst(esNode);
        }
    }
    if (Array.isArray(node.statements))
        obj.statements = node.statements.map((stmt) => serializeAst(stmt));
    // 递归遍历所有子节点
    const children = node.getChildren();
    if (children && children.length > 0) {
        obj.children = children.map(serializeAst);
    }
    return obj;
}
const parseTs = (tsCode) => {
    const sourceFile = ts.createSourceFile("temp.ts", tsCode, ts.ScriptTarget.Latest, true);
    return serializeAst(sourceFile);
};
exports.parseTs = parseTs;

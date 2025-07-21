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
    if (node.expression) {
        obj.expression = node.expression.getText();
        // 细化 VantComponent 调用
        if (ts.isCallExpression(node.expression) &&
            node.expression.expression.getText() === "VantComponent") {
            const callExpr = node.expression;
            obj.callee = callExpr.expression.getText();
            obj.arguments = callExpr.arguments.map((arg) => {
                if (ts.isObjectLiteralExpression(arg)) {
                    // 递归解析对象参数
                    const parseObj = (objExpr) => {
                        const result = {};
                        objExpr.properties.forEach((prop) => {
                            if (ts.isPropertyAssignment(prop)) {
                                const key = prop.name.getText();
                                let value;
                                // methods 特殊处理
                                if (key === "methods" &&
                                    ts.isObjectLiteralExpression(prop.initializer)) {
                                    value = {};
                                    prop.initializer.properties.forEach((m) => {
                                        if (ts.isMethodDeclaration(m)) {
                                            value[m.name.getText()] = m.getText();
                                        }
                                        else if (ts.isPropertyAssignment(m) &&
                                            (ts.isFunctionExpression(m.initializer) ||
                                                ts.isArrowFunction(m.initializer))) {
                                            value[m.name.getText()] = m.initializer.getText();
                                        }
                                    });
                                }
                                else if (ts.isObjectLiteralExpression(prop.initializer)) {
                                    value = parseObj(prop.initializer);
                                }
                                else if (ts.isArrayLiteralExpression(prop.initializer)) {
                                    value = prop.initializer.elements.map((e) => e.getText());
                                }
                                else if (ts.isStringLiteral(prop.initializer) ||
                                    ts.isNumericLiteral(prop.initializer)) {
                                    value = prop.initializer.text;
                                }
                                else if (ts.isFunctionExpression(prop.initializer) ||
                                    ts.isArrowFunction(prop.initializer)) {
                                    value = prop.initializer.getText();
                                }
                                else {
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
    // 只保留第一级节点，不递归 children
    // 返回根节点的 statements（即源码的顶层结构）
    if (node === node.getSourceFile() &&
        Array.isArray(node.statements)) {
        obj.statements = node.statements.map((stmt) => serializeAst(stmt));
    }
    return obj;
}
const parseTs = (tsCode) => {
    const sourceFile = ts.createSourceFile("temp.ts", tsCode, ts.ScriptTarget.Latest, true);
    return serializeAst(sourceFile);
};
exports.parseTs = parseTs;

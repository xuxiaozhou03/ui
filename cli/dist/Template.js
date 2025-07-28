"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attrs_1 = __importDefault(require("./Attrs"));
const PathProvider_1 = __importDefault(require("./PathProvider"));
const htmlparser2_1 = require("htmlparser2");
class Template {
    constructor(name) {
        this.parse = (wxml) => {
            const ast = (0, htmlparser2_1.parseDocument)(wxml, { xmlMode: true });
            const asts = [];
            const extractNode = (node) => {
                if (node.type === "tag" && node.name !== "wxs") {
                    let children = [];
                    if (node.children &&
                        Array.isArray(node.children) &&
                        node.children.length > 0) {
                        children = node.children
                            .map(extractNode)
                            .filter(Boolean);
                    }
                    const tag = this.parseTag(node.name);
                    const attrs = new Attrs_1.default(node.attribs || {}, this.isCustomComponent(tag));
                    const resultNode = {
                        tag,
                        attrs: attrs.config,
                        children,
                    };
                    if (children.length === 0) {
                        resultNode.children = undefined;
                    }
                    if (Object.keys(resultNode.attrs).length === 0) {
                        resultNode.attrs = undefined;
                    }
                    return resultNode;
                }
                return null;
            };
            if (ast.children && Array.isArray(ast.children)) {
                ast.children.forEach((child) => {
                    const n = extractNode(child);
                    if (n)
                        asts.push(n);
                });
            }
            return asts;
        };
        this.name = name;
        let fileContent = PathProvider_1.default.getFileContent(name + "/index.wxml");
        if (fileContent) {
            const ast = this.parse(fileContent);
            PathProvider_1.default.setFileContent(this.name + ".json", JSON.stringify(ast, null, 2));
        }
    }
    parseTag(tag) {
        const map = {
            block: "template",
            view: "div",
            image: "img",
        };
        if (map[tag]) {
            return map[tag];
        }
        return tag;
    }
    isCustomComponent(tag) {
        return tag.includes("-");
    }
}
exports.default = Template;

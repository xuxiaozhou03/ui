"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWxml = void 0;
const htmlparser2_1 = require("htmlparser2");
const parseClass_1 = __importDefault(require("./parseClass"));
const parseAttrs = (attrs, isCustomElement) => {
    if (isCustomElement) {
        if (attrs["custom-class"] && attrs.class) {
            attrs["custom-class"] = `${attrs.class} ${attrs["custom-class"]}`;
            delete attrs.class;
        }
    }
    const newAttrs = Object.entries(attrs).reduce((acc, [key, value]) => {
        const map = {
            "wx:for": "v-for",
            "wx:for-item": "v-for-item",
            "wx:for-index": "v-for-index",
            "wx:key": ":key",
            "wx:if": "v-if",
            "wx:else": "v-else",
            "wx:elif": "v-else-if",
        };
        if (map[key]) {
            key = map[key];
        }
        if (key.startsWith("bind:")) {
            key = key.replace("bind:", "@");
        }
        if (key.startsWith("bind")) {
            key = key.replace("bind", "@");
        }
        if (key.startsWith("catch")) {
            key = key.replace("catch", "@catch");
        }
        if (value.startsWith("{{") && value.endsWith("}}")) {
            value = value.slice(2, -2).trim();
            if (!key.startsWith("v-") &&
                !key.startsWith(":") &&
                !key.startsWith("@")) {
                key = `:${key}`;
            }
        }
        if (value.startsWith("computed.")) {
            const match = value.match(/^computed\.(\w+)\s*\((.*)\)$/);
            if (match) {
                value = match[1];
                if (!key.startsWith("v-") &&
                    !key.startsWith(":") &&
                    !key.startsWith("@")) {
                    key = `:${key}`;
                }
            }
        }
        if (key.includes("class")) {
            const obj = (0, parseClass_1.default)(key, value);
            acc = Object.assign(Object.assign({}, acc), obj);
            return acc;
        }
        acc[key] = value;
        return acc;
    }, {});
    return newAttrs;
};
const parseTag = (tag) => {
    const tagMap = {
        block: "template",
        view: "div",
    };
    return tagMap[tag] || tag;
};
const parseWxml = (wxml) => {
    const ast = (0, htmlparser2_1.parseDocument)(wxml, { xmlMode: true });
    const result = [];
    const extractNode = (node) => {
        if (node.type === "tag" && node.name !== "wxs") {
            let children = [];
            if (node.children &&
                Array.isArray(node.children) &&
                node.children.length > 0) {
                children = node.children.map(extractNode).filter(Boolean);
            }
            const tag = parseTag(node.name);
            const resultNode = {
                tag,
                attrs: parseAttrs(node.attribs || {}, tag.includes("-")),
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
                result.push(n);
        });
    }
    return result;
};
exports.parseWxml = parseWxml;

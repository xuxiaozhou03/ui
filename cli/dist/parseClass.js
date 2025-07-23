"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatClassName = (className) => {
    return className.split("-").reduce((acc, part, index) => {
        if (index === 0) {
            return part;
        }
        return acc + part.charAt(0).toUpperCase() + part.slice(1);
    }, "");
};
const parseClass = (key, value) => {
    // 纯字符串的 class
    if (!value.includes("{{") &&
        !value.includes("util") &&
        !value.includes("?")) {
        const staticClassNames = [];
        const dynamicClassNames = [];
        value.split(" ").forEach((v) => {
            if (v.includes("-class")) {
                dynamicClassNames.push(formatClassName(v));
            }
            else {
                staticClassNames.push(v);
            }
        });
        if (dynamicClassNames.length === 0) {
            return {
                [key]: value.split(" ").join(" "),
            };
        }
        let newClassName = "";
        if (staticClassNames.length > 0) {
            newClassName = `'${staticClassNames.join(" ")}'`;
        }
        if (newClassName.length > 0 && dynamicClassNames.length > 0) {
            newClassName += ",";
        }
        newClassName += dynamicClassNames.map((v) => ` ${v}`).join(",");
        newClassName = `cn(${newClassName})`;
        if (!key.startsWith(":")) {
            key = `:${key}`;
        }
        return {
            [key]: newClassName,
        };
    }
    // 处理：utils.bem('skeleton__content')
    if (value.includes("utils.bem") && !value.includes("{{")) {
        value = value.replace("utils.bem(", "bem(");
        if (!key.startsWith(":")) {
            key = `:${key}`;
        }
        return {
            [key]: value,
        };
    }
    // 处理 van-calendar__popup--{{ position }}
    // custom-class van-collapse {{ border ? 'van-hairline--top-bottom' : '' }}
    if (value.includes("{{") && value.includes("}}") && !value.includes("util")) {
    }
    return {
        [key]: value,
    };
};
exports.default = parseClass;

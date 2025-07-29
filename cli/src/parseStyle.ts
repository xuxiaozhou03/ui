export const rename = (key: string) =>
  key.split("-").reduce((ac, cu, index) => {
    return ac + (index === 0 ? cu : cu[0].toUpperCase() + cu.slice(1));
  }, "");
// 解析 style 字符串为对象
const pickStyleFromString = (value: string) => {
  return value
    .split(";")
    .filter(Boolean)
    .reduce((acc, item) => {
      let [key, val] = item.split(":");
      if (!key || !val) return acc;
      key = key.trim();
      val = val.trim();
      key = rename(key);
      return {
        ...acc,
        [key]: val,
      };
    }, {});
};
export const parseStyleValue = (value: string): string => {
  // 判断是否为纯字符串 style
  // eg: padding: 5px 10px 5px 0; background-color: transparent;
  // return: '{ "padding": "5px 10px 5px 0", "backgroundColor": "transparent" }'
  if (!value.includes("{{")) {
    const newValue = pickStyleFromString(value);
    return JSON.stringify(newValue, null, 2);
  }
  // 纯变量, 没有其他
  // {{ wrapperStyle }}
  // return wrapperStyle
  if (!value.includes("(") && !value.includes(":") && !value.includes("?")) {
    value = value.slice(2, -2).trim();
    return value;
  }
  // ...后续处理其它类型
  // 只有计算属性，没有其他
  // eg: {{ computed.sizeStyle({ previewSize }) }}
  // return: sizeStyle
  if (value.includes("computed")) {
    const match = value.match(/computed\.([a-zA-Z0-9_]+)\s*\(/);
    const funcName = match ? match[1] : null;
    if (!funcName) {
      return "";
    }
    if (value.includes("customStyle")) {
      return `{...${funcName}, ...customStyle}`;
    }
    return funcName;
  }

  if (value.includes("style")) {
    const match = value.match(/style\(\{([^\}]+)\}\)/);
    if (match) {
      const styleObject = match[1];
      return `{${value.includes("barStyle") ? "...barStyle," : ""}${styleObject
        .trim()
        .replace("utils.", "")}}`;
    }
    return "";
  }

  if (!value.startsWith("{{")) {
    return value
      .trim()
      .split(";")
      .map((item) => {
        item = item.trim();

        if (!item) {
          return "";
        }

        if (item.includes(":")) {
          const index = item.indexOf(":");
          let key = item.slice(0, index).trim();
          key = rename(key);
          let val = item.slice(index + 1).trim();
          if (!val.includes("{{")) {
            return `"${key}": "${val}"`;
          }
          if (val.startsWith("{{") && val.endsWith("}}")) {
            val = val.slice(2, -2).trim();
            return `"${key}": "${val.replace("utils.", "")}"`;
          }
          const [d, u] = val
            .slice(3)
            .split("}}")
            .map((s) => s.trim());

          val = `${d} + '${u}'`;
          return `"${key}": "${val}"`;
        }

        item = item.slice(2, -2).trim();
        return `...${item}`;
      })
      .filter(Boolean)
      .join(",");
  }

  return value;
};

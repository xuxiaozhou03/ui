// margin-right -> marginRight
const rename = (name: string) => {
  return name.split("-").reduce((acc, cur, index) => {
    if (index === 0) {
      return acc + cur;
    }
    return acc + cur[0].toUpperCase() + cur.slice(1);
  }, "");
};

const handleStyle = (value: string) => {
  const obj = value
    .split(";")
    .filter(Boolean)
    .reduce((acc, cur) => {
      const [k1, v1] = cur.split(":");
      return {
        ...acc,
        [rename(k1.trim())]: v1.trim(),
      };
    }, {} as Record<string, string>);
  return obj;
};

// style({ backgroundColor: activeColor })
// style({ fontSize: utils.addUnit(size) })
const pickStyle = (value: string) => {
  value = value.replace("style({", "").replace("})", "").replace("utils.", "");
  if (!value.includes("?")) {
    return handleStyle(value);
  }
  // paddingRight: index !== count - 1 ? addUnit(gutter) : null
  const index = value.indexOf(":");
  return {
    [value.slice(0, index).trim()]: value.slice(index + 1).trim(),
  };
};

class Styles {
  constructor(value: string) {
    this.checkType(value.replace("utils.addUnit", "addUnit").trim());
  }

  checkType(value: string) {
    if (!["?", "+", "{ ", ":"].some((a) => value.includes(a))) {
      return value;
    }
    if (value.includes("style(")) {
      if (!value.includes("{{")) {
        value = value.slice(2, -2).trim();
        console.log(value);
      }
    }
  }
}

class Attrs {
  config: Record<string, any> = {};

  constructor(attrs: Record<string, string>, private isCustomElement: boolean) {
    Object.keys(attrs).forEach((key) => {
      this.formatAttr(key, attrs[key]);
    });
  }

  formatAttr(key: string, value: string) {
    const newKey = this.formatKey(key);

    this.config = {
      ...this.config,
      ...this.formatValue(value, newKey),
    };
  }

  addDynamicKey(key: string) {
    if (key.startsWith(":")) {
      return key;
    }
    if (["v-", "@"].find((a) => key.startsWith(a))) {
      return key;
    }
    return `:${key}`;
  }

  formatStyle(value: string, key: string) {
    if (![":", "?", "{{", "utils"].find((a) => value.includes(a))) {
      // rootStyle
      return { [key]: value };
    }

    if (!["?", "{{", "utils"].find((a) => value.includes(a))) {
      // padding: 5px 10px 5px 0; background-color: transparent;
      if (!value.includes("+")) {
        return handleStyle(value);
      }
      // 'width:' + avatarSize + ';height:' + avatarSize
      // 处理带 + 的动态表达式
      const obj = value
        .split(";")
        .filter(Boolean)
        .reduce((acc, cur) => {
          // 例：'width:' + avatarSize
          const match = cur.match(/^['"]?([\w-]+):['"]?\s*\+\s*(.+)$/);
          if (match) {
            const key = rename(match[1].trim());
            const val = match[2].replace("+", "").replace("'", "").trim();
            acc[key] = val;
          }
          return acc;
        }, {} as Record<string, string>);
      return obj;
    }

    if (value.includes("style(")) {
      // style({ fontSize: utils.addUnit(size) })
      if (!value.includes("{{")) {
        return pickStyle(value);
      }
      // {{ barStyle }}; {{ style({ backgroundColor: activeColor }) }}
      return value
        .split("}}")
        .map((v) => {
          v = v.replace("{{ ", "").replace(";", "").trim();
          if (v.startsWith("style(")) {
            return pickStyle(v);
          }
          return v;
        })
        .filter(Boolean);
    }
    // color: {{ cancelButtonColor }}
    if (!["utils", "?", "computed."].find((a) => value.includes(a))) {
      if (!value.includes(";{{")) {
        const [k1, v1] = value.split(":");
        let val = v1.trim();
        if (val.endsWith("}}")) {
          // {{ cancelButtonColor }}
          val = val.slice(2, -2).trim();
        } else {
          val = val.replace("{{", "").replace(";", "").trim();
          const [d1, d2] = val.split("}}");
          val = d1.trim() + ("+'" + d2.trim() + "'");
        }
        return {
          [rename(k1.trim())]: val,
        };
      }
    }
    console.log(value);
    return {};
  }

  formatValue(value: string | any, key: string) {
    if (
      value.startsWith("{{") &&
      value.endsWith("}}") &&
      !value.slice(2, -2).includes("{{")
    ) {
      value = value.slice(2, -2).trim();
      key = this.addDynamicKey(key);
    }

    if (value.startsWith("computed.")) {
      const match = value.match(/^computed\.(\w+)\s*\((.*)\)$/);
      if (match) {
        value = match[1];
        key = this.addDynamicKey(key);
      }
    }

    if (key.includes("style")) {
      new Styles(value);
      //   value = this.formatStyle(value, key);
    }
    return {
      [key]: value,
    };
  }

  formatKey(key: string): string {
    const map = {
      "wx:for": "v-for",
      "wx:for-item": "v-for-item",
      "wx:for-index": "v-for-index",
      "wx:key": ":key",
      "wx:if": "v-if",
      "wx:else": "v-else",
      "wx:elif": "v-else-if",
    } as Record<string, string>;

    if (map[key]) {
      key = map[key];
    }

    const replaceMap = [
      ["bind:", "@"],
      ["bind", "@"],
      ["catch", "@catch"],
    ];

    for (let i = 0; i < replaceMap.length; i += 1) {
      const [m1, m2] = replaceMap[i];
      if (key.startsWith(m1)) {
        key = key.replace(m1, m2);
      }
    }

    return key;
  }
}

export default Attrs;

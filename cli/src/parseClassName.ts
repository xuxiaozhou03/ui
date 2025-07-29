import { rename } from "./parseStyle";
import { addDynamicBinding } from "./template";

export const parseClassName = (key: string, value: string) => {
  // van-uploader__file-name van-ellipsis
  if (!value.includes("{{")) {
    const arr = value.split(" ").map((item) => {
      if (item.includes("-class")) {
        return rename(item);
      }
      return `'${item}'`;
    });
    return {
      [addDynamicBinding(key)]: arr.join(","),
    };
  }
  if (value.startsWith("{{") && value.endsWith("}}")) {
    // {{ iconPrefix }}
    if (
      !value.includes("?") &&
      !value.includes("utils.") &&
      !value.includes("computed.")
    ) {
      value = value.slice(2, -2).trim();
      key = addDynamicBinding(key);
      return {
        [key]: value,
      };
    }

    if (value.lastIndexOf("{{") === 0) {
      value = value.slice(2, -2).replace("utils.", "").trim();
      return {
        [addDynamicBinding(key)]: value,
      };
    }
    return {
      [addDynamicBinding(key)]: value,
    };
  }
  return {
    [addDynamicBinding(key)]: value,
  };
};

/* eslint-disable */
const PREFIX = "van-";

type BemConf =
  | undefined
  | string
  | number
  | Array<BemConf>
  | Record<string, any>;

function join(name: string, mods: Array<string | number>): string {
  name = PREFIX + name;
  mods = mods.map(function (mod) {
    return name + "--" + mod;
  });
  mods.unshift(name);
  return mods.join(" ");
}

function traversing(mods: Array<string | number>, conf: BemConf): void {
  if (!conf) {
    return;
  }
  if (typeof conf === "string" || typeof conf === "number") {
    mods.push(conf);
  } else if (Array.isArray(conf)) {
    conf.forEach(function (item) {
      traversing(mods, item);
    });
  } else if (typeof conf === "object") {
    Object.keys(conf).forEach(function (key) {
      conf[key] && mods.push(key);
    });
  }
}

function bem(name: string, conf: BemConf): string {
  const mods: Array<string | number> = [];
  traversing(mods, conf);
  return join(name, mods);
}

export default bem;

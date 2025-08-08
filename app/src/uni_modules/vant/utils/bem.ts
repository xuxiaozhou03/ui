const PREFIX = "van-";

type BemConf =
  | string
  | number
  | Array<BemConf>
  | Record<string, boolean>
  | null
  | undefined;

function join(name: string, mods: (string | number)[]): string {
  const className = PREFIX + name;
  const modClasses = mods.map((mod) => {
    return className + "--" + mod;
  });
  modClasses.unshift(className);
  return modClasses.join(" ");
}

function traversing(mods: (string | number)[], conf: BemConf): void {
  if (!conf) {
    return;
  }

  if (typeof conf === "string" || typeof conf === "number") {
    mods.push(conf);
  } else if (Array.isArray(conf)) {
    conf.forEach((item) => {
      traversing(mods, item);
    });
  } else if (typeof conf === "object") {
    Object.keys(conf).forEach((key) => {
      conf[key] && mods.push(key);
    });
  }
}

function bem(name: string, conf?: BemConf): string {
  const mods: (string | number)[] = [];
  traversing(mods, conf);
  return join(name, mods);
}

export default bem;

const PREFIX = "van-";

function join(name: string, mods: Array<string | number>): string {
  const base = PREFIX + name;
  const classes = mods.map((mod) => `${base}--${mod}`);
  classes.unshift(base);
  return classes.join(" ");
}

function traversing(mods: Array<string | number>, conf: any): void {
  if (!conf) return;
  if (typeof conf === "string" || typeof conf === "number") {
    mods.push(conf);
  } else if (Array.isArray(conf)) {
    conf.forEach((item: any) => traversing(mods, item));
  } else if (typeof conf === "object") {
    Object.keys(conf).forEach((key: string) => {
      if (conf[key]) mods.push(key);
    });
  }
}

export function bem(name: string, conf?: any): string {
  const mods: Array<string | number> = [];
  traversing(mods, conf);
  return join(name, mods);
}

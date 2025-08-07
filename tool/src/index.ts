import * as path from "path";
import * as fs from "fs";
import Wxml from "./wxml";
import { getFileContent } from "./utils";
import Script from "./script";

const packagesPath = path.resolve(__dirname, "../../vant-weapp-dev/packages");
const buildPath = path.resolve(__dirname, "../../vant-weapp-dev/build");

class Component {
  name: string;
  packageName: string;
  wxml: Wxml;
  script: Script;

  constructor(name: string) {
    this.name = name;
    this.packageName = "van-" + name;
    const packagePath = path.join(packagesPath, name);
    this.wxml = new Wxml(packagePath);
    // 获取组件内容
    // const ts = getFileContent(path.join(packagePath, "index.ts"));
    // const wxs = getFileContent(path.join(packagePath, "index.wxs"));
    const wxss = getFileContent(path.join(buildPath, name, "index.wxss"));
    this.script = new Script(packagePath);
    this.generateCode(wxss);
  }

  // 生成代码
  generateCode(wxss: string) {
    fs.writeFileSync(
      path.join(__dirname, "..", "output", this.packageName + ".json"),
      JSON.stringify(
        {
          template: this.wxml.asts,
          style: wxss.replace("@import '../common/index.wxss';", ""),
          ts: this.script.astTree,
        },
        null,
        2
      )
    );
  }
}

const main = () => {
  const packages = fs.readdirSync(packagesPath).filter((name) => {
    if (["wxs", "definitions", "common", "mixins"].includes(name)) {
      return false;
    }
    const fullPath = path.join(packagesPath, name);
    return fs.statSync(fullPath).isDirectory();
  });
  packages.forEach((packageName) => {
    new Component(packageName);
  });
};
main();

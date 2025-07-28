import * as fs from "fs";
import path from "path";
import Package from "./Package";
import pathProvider from "./PathProvider";

class Main {
  get directories() {
    const packagesPath = pathProvider.packagesPath;
    return fs
      .readdirSync(packagesPath)
      .filter(
        (file: string) =>
          fs.statSync(path.join(packagesPath, file)).isDirectory() &&
          !["wxs", "common", "mixins", "definitions"].includes(file)
      );
  }

  constructor() {
    this.run();
  }

  run() {
    this.directories.forEach((packageName) => {
      new Package(packageName);
    });
  }
}

export default Main;

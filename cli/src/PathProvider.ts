import * as path from "path";
import * as fs from "fs";

class PathProvider {
  get rootPath() {
    return path.resolve(__dirname, "..", "..", "vant-weapp-dev");
  }

  get packagesPath() {
    return path.join(this.rootPath, "packages");
  }

  get distPath() {
    return path.join(this.rootPath, "dist");
  }

  get outputPath() {
    return path.join(
      this.rootPath,
      "..",
      "app/src/uni-modules/vant/components"
    );
  }

  setFileContent = (filename: string, content: string) => {
    fs.writeFileSync(path.resolve(this.outputPath, filename), content);
  };

  getFileContent = (fileName: string) => {
    const filePath = path.join(this.packagesPath, fileName);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      if (content) {
        return content;
      }
    }
    return null;
  };
}
export default new PathProvider();

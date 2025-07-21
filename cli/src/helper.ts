import * as fs from "fs";
import * as path from "path";

export const rootPath = path.resolve(__dirname, "..", "..", "vant-weapp-dev");
export const packagesPath = path.join(rootPath, "packages");
export const distPath = path.join(rootPath, "dist");
export const outputPath = path.join(rootPath, "..", "output");

export const directories = fs
  .readdirSync(packagesPath)
  .filter(
    (file: string) =>
      fs.statSync(path.join(packagesPath, file)).isDirectory() &&
      !["wxs", "common", "mixins", "definitions"].includes(file)
  );

export const getFileContent = (fileName: string) => {
  const filePath = path.join(packagesPath, fileName);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    if (content) {
      return content;
    }
  }
  return null;
};

export const getDistFileContent = (fileName: string) => {
  const filePath = path.join(distPath, fileName);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    if (content) {
      return content;
    }
  }
  return null;
};

import * as fs from "fs";
import * as path from "path";
import { parseWxml } from "./parseWxml";
import { parseTs } from "./parseTs";

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

export const getWxml = (fileName: string) => {
  const filePath = path.join(packagesPath, fileName, `index.wxml`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    if (content) {
      return parseWxml(content);
    }
  }
  return null;
};

export const getTypescript = (fileName: string) => {
  const filePath = path.join(packagesPath, fileName, `index.ts`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    if (content) {
      return parseTs(content);
    }
  }
  return null;
};

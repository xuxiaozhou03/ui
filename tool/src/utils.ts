import * as fs from "fs";

export const getFileContent = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    return "";
  }
};

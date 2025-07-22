import fs from "fs";
import { getDistFileContent, getFileContent, outputPath } from "./helper";
import { parseTs } from "./parseTs";
import { parseWxml } from "./parseWxml";

export const parsePackage = (packageName: string) => {
  let wxmlData = null;
  const wxml = getFileContent(packageName + "/index.wxml");
  if (wxml) {
    wxmlData = parseWxml(wxml);
  }

  let tsData = null;
  const ts = getFileContent(packageName + "/index.ts");
  if (ts) {
    tsData = parseTs(ts);
  }

  let wxs = getFileContent(packageName + "/index.wxs");
  let wxsData = null;
  if (wxs) {
    wxsData = parseTs(wxs);
  }

  let wxss = getDistFileContent(packageName + "/index.wxss");
  wxss = wxss ? wxss.replace("@import '../common/index.wxss';", "") : "";

  const data = {
    wxml: wxmlData,
    ts: tsData,
    wxs: wxsData,
    wxss: wxss,
  };
  fs.writeFileSync(
    `${outputPath}/${packageName}.json`,
    JSON.stringify(data, null, 2)
  );
};

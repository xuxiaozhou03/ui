// This is the entry point of the TypeScript application.
// You can add your main logic, functions, or classes here.

import fs from "fs";
import { directories, getTypescript, getWxml, outputPath } from "./helper";

const data = getWxml("button");
const ts = getTypescript("button");
// console.log(JSON.stringify(data, null, 2));
fs.writeFileSync(`${outputPath}/button.json`, JSON.stringify(data, null, 2));
fs.writeFileSync(`${outputPath}/button.ts.json`, JSON.stringify(ts, null, 2));

// This is the entry point of the TypeScript application.
// You can add your main logic, functions, or classes here.
import { parsePackage } from "./parse";
import { directories } from "./helper";

directories.forEach((dir) => {
  parsePackage(dir);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This is the entry point of the TypeScript application.
// You can add your main logic, functions, or classes here.
const parse_1 = require("./parse");
const helper_1 = require("./helper");
helper_1.directories.forEach((dir) => {
    (0, parse_1.parsePackage)(dir);
});

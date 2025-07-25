"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistFileContent = exports.getFileContent = exports.directories = exports.outputPath = exports.distPath = exports.packagesPath = exports.rootPath = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
exports.rootPath = path.resolve(__dirname, "..", "..", "vant-weapp-dev");
exports.packagesPath = path.join(exports.rootPath, "packages");
exports.distPath = path.join(exports.rootPath, "dist");
exports.outputPath = path.join(exports.rootPath, "..", "output");
exports.directories = fs
    .readdirSync(exports.packagesPath)
    .filter((file) => fs.statSync(path.join(exports.packagesPath, file)).isDirectory() &&
    !["wxs", "common", "mixins", "definitions"].includes(file));
const getFileContent = (fileName) => {
    const filePath = path.join(exports.packagesPath, fileName);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        if (content) {
            return content;
        }
    }
    return null;
};
exports.getFileContent = getFileContent;
const getDistFileContent = (fileName) => {
    const filePath = path.join(exports.distPath, fileName);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        if (content) {
            return content;
        }
    }
    return null;
};
exports.getDistFileContent = getDistFileContent;

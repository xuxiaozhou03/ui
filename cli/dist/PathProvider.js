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
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
class PathProvider {
    constructor() {
        this.setFileContent = (filename, content) => {
            fs.writeFileSync(path.resolve(this.outputPath, filename), content);
        };
        this.getFileContent = (fileName) => {
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
        return path.join(this.rootPath, "..", "app/src/uni-modules/vant/components");
    }
}
exports.default = new PathProvider();

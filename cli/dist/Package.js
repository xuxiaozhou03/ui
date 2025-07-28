"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Template_1 = __importDefault(require("./Template"));
class Package {
    constructor(name) {
        this.template = new Template_1.default(name);
    }
}
exports.default = Package;

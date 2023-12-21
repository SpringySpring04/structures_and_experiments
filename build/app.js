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
const structures_1 = require("./structures");
const timers = __importStar(require("node:timers/promises"));
async function add(a, b) {
    console.log(`Adding ${a} + ${b} ... (100 ms)`);
    return await timers.setTimeout(100, [a + b, a]);
}
async function sub(a, b) {
    console.log(`Subtracting ${a} - ${b} ... (300 ms)`);
    return await timers.setTimeout(300, [a - b, a]);
}
async function mult(a, b) {
    console.log(`Multiplying ${a} * ${b} ... (800 ms)`);
    return await timers.setTimeout(800, [a * b, a]);
}
async function sqrt(x) {
    console.log(`Square Rooting ${x} ... (2000 ms)`);
    return await timers.setTimeout(2000, Math.sqrt(x));
}
(async () => {
    var q = new structures_1.structures.Queue(add, sub, mult, sqrt);
    var result = await q.start(1, 1);
    console.log(result);
})();

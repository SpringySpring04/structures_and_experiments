
import { structures } from "./structures";
import * as timers from 'node:timers/promises';

async function add(a: number,b: number) {
    console.log(`Adding ${a} + ${b} ... (100 ms)`);
    return await timers.setTimeout(100, [a + b, a]);
}
async function sub(a: number, b: number) {
    console.log(`Subtracting ${a} - ${b} ... (300 ms)`);
    return await timers.setTimeout(300, [a - b, a]);
}
async function mult(a: number, b: number) {
    console.log(`Multiplying ${a} * ${b} ... (800 ms)`);
    return await timers.setTimeout(800, [a * b, a]);
}
async function sqrt(x: number) {
    console.log(`Square Rooting ${x} ... (2000 ms)`);
    return await timers.setTimeout(2000, Math.sqrt(x));
}

async function main(): Promise<void> {
    var q = new structures.TaskQueue(add, sub, mult, sqrt);
    var result = await q.start(1,1);
    console.log(result);
}
main();
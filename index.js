import { update } from "ramda";
import { constructArray, initArray } from "./arrays";
import { constructMatrix } from "./matricies";

let i = 0;

console.log(constructArray(() => i++)(10));

i = 0;

console.log(constructMatrix(() => i++)({ height: 10, width: 10 }));

const list = initArray(10);
console.log(update(3)(4)(list));

import { babelCodegen } from "../src/index.js";
import { transformSync } from "@babel/core";

const src = `const { self } = window;
const x = { a: 1, b: 2 };
const { a, b } = x;
const [ k, v ] = x;`;

const { code } = transformSync(src, {
  plugins: [babelCodegen],
});

console.log(code);

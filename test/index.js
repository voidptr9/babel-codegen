import { babelCodegen } from "../src/index.js";
import { transformSync } from "@babel/core";

const src = `class App {
  msg = "Hello, World!";

  nested = () => () => () => globalThis;
  
  greet(msg = this.msg) {
    return msg;
  }
}

const { self = true } = window;
let a, b;
[a=5, b=7] = [1];
[x=10, y=20, z=30] = [1];`;

const { code } = transformSync(src, {
  plugins: [babelCodegen],
});

console.log(code);

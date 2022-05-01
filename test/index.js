import { babelCodegen } from "../src/index.js";
import { transformSync } from "@babel/core";

const src = `class App {
  msg = "Hello, World!";
  
  greet(msg = this.msg) {
    return msg;
  }
}`;

const { code } = transformSync(src, {
  plugins: [babelCodegen],
});

console.log(code);

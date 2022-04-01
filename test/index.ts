// @ts-nocheck
import { test } from "uvu";
// import * as assert from "uvu/assert";
import { babelCodegen } from "../src/index.js";
import { transformSync } from "@babel/core";

const src = `class App {
  msg = "Hello, World!";
  
  greet() {
    return this.msg;
  }
}`;

test("default", () => {
  const { code } = transformSync(src, {
    plugins: [babelCodegen],
  });

  console.log("\n\n\n", code);
});

test.run();

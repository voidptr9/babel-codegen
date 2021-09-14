// @ts-nocheck
import { test } from "uvu";
// import * as assert from "uvu/assert";
import { babelCodegen } from "../src/index.js";
import { transformSync } from "@babel/core";

const src = `const a = 5, b = 10, c = () => a + b;`;

test("default", () => {
  const { code } = transformSync(src, {
    plugins: [babelCodegen],
  });

  console.log(code);
});

test.run();

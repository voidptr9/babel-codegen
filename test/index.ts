// @ts-nocheck
import { test } from "uvu";
// import * as assert from "uvu/assert";
import { babelCodegen } from "../src/index.js";
import { transformSync } from "@babel/core";

const src = `const a = 5,
  b = 10_000,
  c = () => a + b;
let o = \`hey \${why} there\` + \`ok \${a || b} there\`;`;

test("default", () => {
  const { code } = transformSync(src, {
    plugins: [babelCodegen],
  });

  console.log("\n\n\n", code);
});

test.run();

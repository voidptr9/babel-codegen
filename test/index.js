import { babelCodegen } from "../src/index.js";
import { transformSync } from "@babel/core";
import cliTable from "cli-table";
import cliHeighlight from "cli-highlight";

const { highlight } = cliHeighlight;
const Table = cliTable;

const src = `const { self } = window;
const x = { a: 1, b: 2 };
const { a, b } = x;
const [ i, j, k ] = getVectorCoordinates();
const [ , def_y = 20, z ] = value;`;
const { code } = transformSync(src, {
  plugins: [babelCodegen],
});
const table = new Table({
  head: ["Source", "Output"],
  colWidths: [50, 70],
});

table.push([
  highlight(src, { language: "javascript", ignoreIllegals: true }),
  highlight(code, { language: "javascript", ignoreIllegals: true }),
]);

console.clear();
console.log(table.toString());

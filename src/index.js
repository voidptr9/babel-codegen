import * as t from "@babel/types";
import VariableDeclaration from "./nodes/VariableDeclaration.js";
import ArrowFunctionExpression from "./nodes/ArrowFunctionExpression.js";
import TemplateLiteral from "./nodes/TemplateLiteral.js";
import NumericLiteral from "./nodes/NumericLiteral.js";
import ClassDeclaration from "./nodes/ClassDeclaration.js";

export function babelCodegen() {
  return {
    name: "babel-plugin-codegen",
    visitor: {
      VariableDeclaration,
      ArrowFunctionExpression,
      TemplateLiteral,
      NumericLiteral,
      ClassDeclaration,
    },
  };
}

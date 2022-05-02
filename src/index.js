import VariableDeclarator from "./nodes/VariableDeclarator.js";
import VariableDeclaration from "./nodes/VariableDeclaration.js";
import ArrowFunctionExpression from "./nodes/ArrowFunctionExpression.js";
import TemplateLiteral from "./nodes/TemplateLiteral.js";
import NumericLiteral from "./nodes/NumericLiteral.js";
import AssignmentPattern from "./nodes/AssignmentPattern.js";
import ClassDeclaration from "./nodes/ClassDeclaration.js";

export function babelCodegen() {
  return {
    name: "babel-plugin-codegen",
    visitor: {
      VariableDeclarator,
      VariableDeclaration,
      AssignmentPattern,
      ArrowFunctionExpression,
      TemplateLiteral,
      NumericLiteral,
      ClassDeclaration: { exit: ClassDeclaration },
    },
  };
}

import * as t from "@babel/types";

export function babelCodegen() {
  return {
    name: "babel-plugin-codegen",
    visitor: {
      VariableDeclaration(path: any) {
        if (path.node.kind === "const" || path.node.kind === "let") {
          path.node.kind = "var";
        }
      },
      ArrowFunctionExpression(path: any) {
        path.replaceWith(
          t.functionExpression(
            void 0,
            path.node.params,
            path.node.body.type === "BlockStatement"
              ? path.node.body
              : t.blockStatement([t.returnStatement(path.node.body)]),
            false,
            path.node.async
          )
        );
        path.skip();
      },
    },
  };
}

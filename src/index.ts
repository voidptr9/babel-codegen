import * as t from "@babel/types";

export function babelCodegen() {
  return {
    name: "babel-plugin-codegen",
    visitor: {
      VariableDeclaration(path: any) {
        if (path.node.kind === "const" || path.node.kind === "let") {
          path.node.kind = "var";
        }
        // path.skip();
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
        // path.skip();
      },
      TemplateLiteral(path: any) {
        const templateExpressions = [];
        const { quasis, expressions } = path.node;

        for (const [i, quasi] of quasis.entries()) {
          if (expressions[i]) {
            templateExpressions.push(
              t.binaryExpression(
                "+",
                t.stringLiteral(quasi.value.raw),
                expressions[i]
              )
            );
          } else {
            templateExpressions.push(t.stringLiteral(quasi.value.raw));
          }
        }

        path.replaceWith(
          t.expressionStatement(
            templateExpressions.reduce((previous: any, current: any) =>
              t.binaryExpression("+", previous, current)
            )
          )
        );
      },
      // NumericLiteral: {
      //   exit(path: any) {
      //     // console.log("yes");
      //     if (path.node.extra) {
      //       path.node.extra.raw = path.node.extra.rawValue;
      //     }
      //     path.skip();
      //   },
      // },
    },
  };
}

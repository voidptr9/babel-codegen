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
      NumericLiteral(path: any) {
        if (path.node.extra && path.node.extra.raw.includes("_")) {
          path.node.extra.raw = path.node.extra.rawValue.toString();
        }

        path.skip();
      },
      ClassDeclaration(path: any) {
        const { name } = path.node.id;
        const fields = [];
        const methods = [];

        for (const subnode of path.node.body.body) {
          if (subnode.type == "ClassProperty") {
            fields.push(
              t.expressionStatement(
                t.assignmentExpression(
                  "=",
                  t.memberExpression(t.thisExpression(), subnode.key),
                  subnode.value
                )
              )
            );
          }

          if (subnode.type == "ClassMethod") {
            methods.push(
              t.assignmentExpression(
                "=",
                t.memberExpression(
                  t.memberExpression(
                    t.identifier(name),
                    t.identifier("prototype")
                  ),
                  subnode.key
                ),
                t.functionExpression(null, [], subnode.body, false, false)
              )
            );
          }
        }

        const es5Class = t.functionExpression(
          t.identifier(name),
          [],
          t.blockStatement(fields),
          false,
          false
        );

        path.replaceWith(
          t.program([
            t.expressionStatement(es5Class),
            ...methods.map((method: t.Expression) =>
              t.expressionStatement(method)
            ),
          ])
        );
      },
    },
  };
}

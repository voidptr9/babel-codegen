import * as t from "@babel/types";

export default function ArrowFunctionExpression(path) {
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
}

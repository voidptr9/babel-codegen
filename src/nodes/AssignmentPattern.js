import * as t from "@babel/types";

export default function AssignmentPattern(path) {
  const { left, right } = path.node;
  const expr = t.assignmentExpression(
    "=",
    left,
    t.logicalExpression("||", left, right)
  );

  // Keep the identifier intact.
  path.replaceWith(left);

  if (
    path.parent.type === "FunctionDeclaration" ||
    path.parent.type === "ClassMethod" ||
    path.parent.type === "ArrowFunctionExpression"
  ) {
    // TODO: Refactor using Babel's APIs.
    const fnBody = path.parentPath.node.body.body;
    path.parentPath.node.body.body = [expr, ...fnBody];
    //path.parentPath.nody.body.unshiftContainer(t.identifier("hey"));
    //path.insertAfter(expr);
  }
}

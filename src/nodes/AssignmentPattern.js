import * as t from "@babel/types";

export default function AssignmentPattern(path) {
  const { left, right } = path.node;
  const expr = t.expressionStatement(
    t.assignmentExpression("=", left, t.logicalExpression("||", left, right))
  );

  // Keep the identifier intact.
  path.replaceWith(left);

  // Handle destructured assignments in variable declarations.
  if (path.parent.type === "ObjectProperty") {
    // The tracker ensures we hit a declaration since:
    //    VariableDeclaration ->
    //      VariableDeclarator ->
    //        ObjectPattern ->
    //          ObjectProperty ->
    let varIndexTracker = 0;

    path.findParent(p => {
      if (varIndexTracker == 4) return;
      if (p.node.type == "VariableDeclaration") {
        p.insertAfter(expr);
      }
      varIndexTracker++;
    });
  }

  // Handle function declaration, class methods and lambda default parameters.
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

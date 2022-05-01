import * as t from "@babel/types";

export default function ClassDeclaration(path) {
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
            t.memberExpression(t.identifier(name), t.identifier("prototype")),
            subnode.key
          ),
          t.functionExpression(null, subnode.params, subnode.body, false, false)
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
      ...methods.map(method => t.expressionStatement(method)),
    ])
  );
}

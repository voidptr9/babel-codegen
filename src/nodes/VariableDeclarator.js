import * as t from "@babel/types";

export default function VariableDeclarator(path) {
  if (path.node.id.type == "ObjectPattern") {
    const vardecl = t.variableDeclaration(
      "var",
      path.node.id.properties.map(({ key, value }) => {
        return t.variableDeclarator(
          key,
          t.memberExpression(path.node.init, key)
        );
      })
    );

    path.parentPath.replaceWith(vardecl);
  }
}

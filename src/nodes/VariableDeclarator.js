import * as t from "@babel/types";

export default function VariableDeclarator(path) {
  // Object destructure pattern.
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

  // Array destructure pattern.
  // We flatten the nodes by intentionally returning an array so that the correct indices
  // can be used when some arrays are provided with default values, e.g:
  //   =>   [i, j = 10, k] = getVectorCoordinates();
  //   <=   var _ref = getVectorCoordinates();
  //   <=   var i = _ref[0],
  //            k = _ref[2];
  //        j = _ref[1] || 10;
  // Currently, the multiple calls to `getVectorCoordinates` are cached in a single scoped
  // reference so computations happen exactly once.
  if (path.node.id.type == "ArrayPattern") {
    const $scopedIdent = path.scope.generateUidIdentifierBasedOnNode(
      path.node.init
    );
    const scopedArrayDeclaration = t.variableDeclaration("var", [
      t.variableDeclarator($scopedIdent, path.node.init),
    ]);
    path.parentPath.insertBefore(scopedArrayDeclaration);
    const vardecl = t.variableDeclaration(
      "var",
      path.node.id.elements
        .map(el => (el && el.type == "Identifier" ? el : undefined))
        .map((ident, i) => {
          if (!ident) return [];
          return t.variableDeclarator(
            ident,
            t.memberExpression($scopedIdent, t.numericLiteral(i), true)
          );
        })
        .flat(Infinity)
    );

    path.parentPath.replaceWith(vardecl);
  }
}

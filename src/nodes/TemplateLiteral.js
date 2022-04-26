export default function TemplateLiteral(path) {
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
      templateExpressions.reduce((previous, current) =>
        t.binaryExpression("+", previous, current)
      )
    )
  );
}

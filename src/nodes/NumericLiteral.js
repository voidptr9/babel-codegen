export default function NumericLiteral(path) {
  if (path.node.extra && path.node.extra.raw.includes("_")) {
    path.node.extra.raw = path.node.extra.rawValue.toString();
  }

  path.skip();
}

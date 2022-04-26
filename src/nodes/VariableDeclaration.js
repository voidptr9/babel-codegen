export default function VariableDeclaration(path) {
  if (path.node.kind === "const" || path.node.kind === "let") {
    path.node.kind = "var";
  }
}

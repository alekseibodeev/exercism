const createBinaryTreeNode = function (value = 0, left = null, right = null) {
  return {
    value,
    left,
    right,
  };
};

const copyTreeChunkAndContext = function (context) {
  const newContext = [];
  let node = createBinaryTreeNode();
  for (const { type, parent, leftContext, rightContext } of context) {
    node.value = parent.value;
    if (type === 'left') {
      node.left = createBinaryTreeNode();
      node.right = rightContext;
      newContext.push(createContext(type, node, leftContext, rightContext));
      node = node.left;
    } else {
      node.left = leftContext;
      node.right = createBinaryTreeNode();
      newContext.push(createContext(type, node, leftContext, rightContext));
      node = node.right;
    }
  }
  return { focus: node, context: newContext };
};

const createContext = function (type, parent, leftContext, rightContext) {
  return {
    type,
    parent,
    leftContext,
    rightContext,
  };
};

export class Zipper {
  constructor(focus, context = []) {
    this.focus = focus;
    this.context = context;
  }

  static fromTree(root) {
    return new Zipper(root);
  }

  toTree() {
    if (this.context.length) {
      return this.context[0].parent;
    }
    return this.focus;
  }

  value() {
    return this.focus.value;
  }

  left() {
    if (!this.focus.left) return null;
    const newFocus = this.focus.left;
    const newContext = [
      ...this.context,
      createContext('left', this.focus, null, this.focus.right),
    ];
    return new Zipper(newFocus, newContext);
  }

  right() {
    if (!this.focus.right) return null;
    const newFocus = this.focus.right;
    const newContext = [
      ...this.context,
      createContext('right', this.focus, this.focus.left, null),
    ];
    return new Zipper(newFocus, newContext);
  }

  up() {
    if (!this.context.length) return null;
    const newFocus = this.context[this.context.length - 1].parent;
    const newContext = this.context.slice(0, -1);
    return new Zipper(newFocus, newContext);
  }

  setValue(value) {
    const { focus, context } = copyTreeChunkAndContext(this.context);
    focus.value = value;
    focus.left = this.focus.left;
    focus.right = this.focus.right;
    return new Zipper(focus, context);
  }

  setLeft(node) {
    const { focus, context } = copyTreeChunkAndContext(this.context);
    focus.value = this.focus.value;
    focus.left = node;
    focus.right = this.focus.right;
    return new Zipper(focus, context);
  }

  setRight(node) {
    const { focus, context } = copyTreeChunkAndContext(this.context);
    focus.value = this.focus.value;
    focus.left = this.focus.left;
    focus.right = node;
    return new Zipper(focus, context);
  }
}

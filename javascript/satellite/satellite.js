const createTreeNode = (value = 0, left = null, right = null) => {
  return { value, left, right };
};

const checkInput = (preorder, inorder) => {
  if (preorder.length !== inorder.length) {
    throw new Error('traversals must have the same length');
  }

  const populateSet = (arr, hashset) => {
    for (const val of arr) {
      if (hashset.has(val)) {
        throw new Error('traversals must contain unique items');
      }
      hashset.add(val);
    }
    return hashset;
  };

  const preorderSet = populateSet(preorder, new Set());
  const inorderSet = populateSet(inorder, new Set());

  for (const val of preorderSet) {
    if (!inorderSet.has(val)) {
      throw new Error('traversals must have the same elements');
    }
  }
};

export const treeFromTraversals = (preorder, inorder) => {
  checkInput(preorder, inorder);
  const inorderMap = new Map(inorder.map((v, i) => [v, i]));
  const buildTree = (preStart, preEnd, inStart, inEnd) => {
    if (preStart > preEnd || inStart > inEnd) return {};
    const rootVal = preorder[preStart];
    const rootIndex = inorderMap.get(rootVal);
    const leftSubtreeSize = rootIndex - inStart;
    const leftChild = buildTree(
      preStart + 1,
      preStart + leftSubtreeSize,
      inStart,
      rootIndex - 1
    );
    const rightChild = buildTree(
      preStart + leftSubtreeSize + 1,
      preEnd,
      rootIndex + 1,
      inEnd
    );
    return createTreeNode(rootVal, leftChild, rightChild);
  };
  return buildTree(0, preorder.length - 1, 0, inorder.length - 1);
};

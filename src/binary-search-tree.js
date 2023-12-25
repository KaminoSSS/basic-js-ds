const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = addFunc(this.treeRoot, data);

    function addFunc(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (data < node.data) {
        node.left = addFunc(node.left, data);
      } else {
        node.right = addFunc(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    if (this.treeRoot === null) return null;
    let node = this.treeRoot;
    if (node.data === data) return node;
    else {
      while (node)
        if (node.data === data) return node;
        else {
          if (data < node.data) {
            node = node.left;
          } else {
            node = node.right;
          }
        }
    }
    return null;
  }

  remove(data) {
    this.treeRoot = removeNode(this.treeRoot, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.right && !node.left) return null;
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this.treeRoot) return null;
    let node = this.treeRoot;
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.treeRoot) return null;
    let node = this.treeRoot;
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};

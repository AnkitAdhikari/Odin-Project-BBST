class Node {
    left = null;
    right = null;
    constructor(value) {
        this.value = value;
    }
}

class Tree {
    root
    constructor(arr) {
        this.root = buildTree(arr);

    }
    insert(value) {
        this.root = insertVal(this.root, value);
    }
    deleteItem(root, value) {
        if (root == null) return root;

        if (value < root.value)
            root.left = this.deleteItem(root.left, value);
        else if (value > root.value)
            root.right = this.deleteItem(root.right, value);
        else {
            if (root.left === null)
                return root.right;
            else if (root.right === null)
                return root.left;
            root.value = this.minvalue(root.right);

            root.right = this.deleteItem(root.right, root.value);

        }
        return root;

    }

    minvalue(node) {
        let minv = node.value;
        while (node.left !== null) {
            minv = node.left.value;
            node = node.left;
        }
        return minv;
    }

    find(root, value) {
        if (root === null) return null;
        if (root.value === value) return root;
        if (value < root.value) return this.find(root.left, value);
        else return this.find(root.right, value);
    }

    levelOrder(root, fn) {
        if (root === null) return;
        const queue = [];
        const valueArr = [];
        queue.push(root);
        while (queue.length > 0) {
            let node = queue.shift()
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            if (fn) fn(node.value);
            valueArr.push(node.value);
        }
        if (!fn) return valueArr;

    }

    inOrder(root, fn) {
        this.traversalArr = [];
        traverseInOrder(root, fn);
        if (!fn) return this.traversalArr;
    }
    preOrder(root, fn) {
        this.traversalArr = [];
        traversePreOrder(root, fn);
        if (!fn) return this.traversalArr;
    }
    postOrder(root, fn) {
        this.traversalArr = [];
        traversePostOrder(root, fn);
        if (!fn) return this.traversalArr;
    }

    height(node) {
        if (node == null) return -1;
        let leftSubTreeHeight = this.height(node.left);
        let rightSubTreeHeight = this.height(node.right);

        if (leftSubTreeHeight > rightSubTreeHeight) {
            return leftSubTreeHeight + 1;
        } else if (rightSubTreeHeight > leftSubTreeHeight) {
            return rightSubTreeHeight + 1;
        } else {
            return leftSubTreeHeight + 1;
        }

    }

    depth(root, node) {
        if (root === null) return null;
        if (root.value === node.value) return 0;
        if (node.value < root.value) return this.depth(root.left, node) + 1;
        if (node.value > root.value) return this.depth(root.right, node) + 1;

    }

}

function buildTree(arr) {
    const counter = {};
    const uniqueArr = [];
    arr.forEach(el => {
        if (!counter[`${el}`]) {
            counter[`${el}`] = true;
            uniqueArr.push(el);
        }
    });
    const perfectArr = uniqueArr.sort((a, b) => a - b);
    return buildBBST(perfectArr, 0, perfectArr.length - 1);

}

function buildBBST(arr, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = buildBBST(arr, start, mid - 1);
    node.right = buildBBST(arr, mid + 1, end);
    return node;
}


function insertVal(root, value) {

    if (root == null) {
        root = new Node(value);
        return root;
    }

    if (value < root.value) {
        root.left = insertVal(root.left, value);
    } else if (value > root.value) {
        root.right = insertVal(root.right, value);
    }
    return root;
}

function traverseInOrder(root, fn) {
    if (root == null) return;
    traverseInOrder(root.left, fn);

    if (fn) fn(root.value);
    tree.traversalArr.push(root.value);

    traverseInOrder(root.right, fn);
}

function traversePreOrder(root, fn) {
    if (root == null) return;

    if (fn) fn(root.value);
    tree.traversalArr.push(root.value);

    traversePreOrder(root.left, fn);
    traversePreOrder(root.right, fn);
}

function traversePostOrder(root, fn) {
    if (root == null) return;
    traversePostOrder(root.left, fn);
    traversePostOrder(root.right, fn);

    if (fn) fn(root.value);
    tree.traversalArr.push(root.value);
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];


const tree = new Tree(arr);

tree.insert(10);

prettyPrint(tree.root);

tree.deleteItem(tree.root, 67);

prettyPrint(tree.root);

tree.find(tree.root, 5);
// tree.levelOrder(tree.root, function logger(val) {
//     console.log(val);
// });
const inorderARray = tree.inOrder(tree.root);
const preorderARray = tree.preOrder(tree.root);
const postorderARray = tree.postOrder(tree.root);

console.log(inorderARray, preorderARray, postorderARray);

console.log(tree.height(tree.root));

console.log(tree.depth(tree.root, { value: 10 }));
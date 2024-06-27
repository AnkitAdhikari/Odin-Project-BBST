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
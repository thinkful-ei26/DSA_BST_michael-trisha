'use strict';

//hierarchy, parent-child relationship
//parent has a max of 2 children
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    //what is the key? 
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  //bst.insert(3, 0)
  /*  9
     / \
    3   7 
  */
  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    //if the tree exists, start at the root and compare the key you want to insert 
    //if less go left
    else if (key < this.key) {
      //if the left is empty, create new node
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this); //this is parent, but what is it?
      }
      //if there's something on the left side, recursively call insert, so node is added further down the tree
      else {
        this.left.insert(key, value);
      }
    }
    //if the key of the value you want to insert is greater than the current node's key, move to the right side
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  //all operations are used using keys, values don't play much of a role unless you want to retrieve it
  find(key) {
    //if the key is in root, return the value
    if (this.key === key) {
      return this.value;
    }
    //if the key is less than the root, follow the left side
    //if there is an existing left child, call the fn recursively until you find the key 
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if key is greater than root, follow right side
    //if there is an existing right child, call the fn recursively until you find the key 
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //you searched the tree, the item is not there
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) { //1
    if (this.parent) { //2
      if (this === this.parent.left) { // 1 
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent; //2
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        // choose a new root by finding the smallest one on the right
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
}

//3,1,4,6,9,2,5,7
const main = () => {
  const bst = new BinarySearchTree();

  bst.insert(3, 0);
  bst.insert(1, 0);
  bst.insert(4, 0);
  bst.insert(6, 0);
  bst.insert(9, 0);
  bst.insert(2, 0);
  bst.insert(5, 0);
  bst.insert(7, 0);
  //console.log(bst);
  // getHeight(bst);
};

main();
//height = 5

// function getHeight(bst) {
//   //traverse the bst
//   // increment when we go down a level
//   // return the lowest level

//   let height = 0;
//   // temp furthestDown
//   // maybe recursion
//   //console.log('First log: ', bst.key);
//   if (!bst) {
//     return height;
//   }
//   //check to see if there's left & right for each recursion
//   if (bst.left) {
//     let left = getHeight(bst.left);
//     console.log('left node', left.key);
//   }
//   if (bst.right) {
//     let right = getHeight(bst.right);
//     console.log('right node', right.key);
//   }

//   return height;
// }

/* ======== HEIGHT OF A BST ======== */
const getHeight = (bst) => {
  if (!bst) {
    return 0;
  }
  if (!bst.left && !bst.right) {
    return 1;
  }
  if (bst.left && bst.right) {
    let left = getHeight(bst.left);
    let right = getHeight(bst.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  if (bst.left) {
    let left = getHeight(bst.left);
    return left + 1;
  }
  if (bst.right) {
    let right = getHeight(bst.right);
    return right + 1;
  }
};

const tempBst = new BinarySearchTree();

// tempBst.insert(2, 0);
// tempBst.insert(3, 0);
// tempBst.insert(6, 0);
// tempBst.insert(1, 0);

tempBst.insert(3, 0);
tempBst.insert(1, 0);
tempBst.insert(4, 0);
tempBst.insert(6, 0);
tempBst.insert(9, 0);
tempBst.insert(2, 0);
tempBst.insert(5, 0);
tempBst.insert(7, 0);

console.log(getHeight(tempBst));

/* ======== is it BST ======== */
//input: 3,1,4,6,9,2,5,7
//output: true

// have something traverse
// case for checking duplicates
// case for checking order (left > right) return false
// after all if we havent returned false return true

function isBst(bt, duplicates = []) {
  //base case
  if (!bt) {
    return false;
  }
  if (bt.parent === null) {
    duplicates.push(bt.key);
  }

  if (bt.right && bt.left) {
    if (duplicates.indexOf(bt.key) === -1) {
      duplicates.push(bt.key);
      if (isBst(bt.right, duplicates) && isBst(bt.left, duplicates)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (bt.left) {
    // add the number to an array to check for duplicates
    // if not a duplicate add to the array
    if (bt.left.key > bt.key) {
      return false;
    }
    if (duplicates.indexOf(bt.left.key) === -1) {
      duplicates.push(bt.left.key);
      return isBst(bt.left, duplicates);
    } else {
      return false;
    }
  }
  if (bt.right) {
    //if left > parent
    if (bt.right.key < bt.key && bt.left.key < bt.right.key) {
      return false;
    }
    // add the number to an array to check for duplicates
    // if not a duplicate add to the array
    if (duplicates.indexOf(bt.right.key) === -1) {
      duplicates.push(bt.right.key);
      return isBst(bt.right, duplicates);
    } else {
      return false;
    }
  }

  return true;
}

const newbt = new BinarySearchTree();

// newbt.insert(6, 0);
// newbt.insert(8, 0);
// newbt.insert(8, 0);
newbt.insert(3, 0);
newbt.insert(1, 0);
newbt.insert(4, 0);
newbt.insert(6, 0);
newbt.insert(9, 0);
newbt.insert(2, 0);
newbt.insert(5, 0);
newbt.insert(7, 0);
// newbt.insert(7, 0);

console.log(isBst(newbt));
'use strict';

//hierarchy, parent-child relationship
//parent has a max of 2 children
class BinarySearchTree {
  constructor(key=null, value=null, parent=null){
    //what is the key? 
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value){
    if(this.key === null){
      this.key = key;
      this.value = value;
    }
    //if the tree exists, start at the root and compare the key you want to insert 
    //if less go left
    else if(key < this.key){
      //if the left is empty, create new node
      if(this.left === null){
        this.left = new BinarySearchTree(key, value, this); //this is parent, but what is it?
      }
      //if there's something on the left side, recursively call insert, so node is added further down the tree
      else {
        this.left.insert(key, value);
      }
    }
    //if the key of the value you want to insert is greater than the current node's key, move to the right side
    else {
      if(this.right === null){
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  //all operations are used using keys, values don't play much of a role unless you want to retrieve it
  find(key) {
    //if the key is in root, return the value
    if(this.key === key) {
      return this.value;
    }
    //if the key is less than the root, follow the left side
    //if there is an existing left child, call the fn recursively until you find the key 
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if key is greater than root, follow right side
    //if there is an existing right child, call the fn recursively until you find the key 
    else if (key > this.key && this.right){
      return this.right.find(key);
    }
    //you searched the tree, the item is not there
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      } if (node) {
        node.parent = this.parent;
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
    if(this.key === key) { //if item exist in the root
      if (this.left && this.right) {  //if both left & right children exists
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
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
  console.log(bst);
};

main();
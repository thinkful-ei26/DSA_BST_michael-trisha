'use strict';
/* Given a sorted array, write an algorithm that creates a binary search tree from the elements of the sorted array in O(n) runtime. the resulting tree will be height balanced.  */

/* 
input: [3, 5, 7, 9, 11, 13, 15]
output:
start at the middle
       9
      / \
     5   13
    / \   / \
   3  7  11 15

  Assumptions: Are we given a default BST JS class? Can we use default JS fn?
  We need to start in the middle, so you need to keep track of start and end
*/


//1. Find the middle of the array, make that the root
//2. Recursively do below until it meets base case:
//Take the left side of the middle and then find its middle and make that the left child of the root
//3. Recursively do below until it meets base case:
//Take the right side of the middle and then find its middle and make that the right child of the root
//4. Return the tree

const sortedArraytoBST = (arr, start=0, end=arr.length-1) => {
  let middle = Math.floor((start+end)/2);
  let bst = new BinarySearchTree(arr[middle]);

  //attach the node of the existing node, with a new end point for the left side
  /* 
       9
      /
     5
   /
  3
  */
  bst.left = sortedArraytoBST(arr, start, middle-1);
  bst.right = sortedArraytoBST(arr, middle+1, end);
  /* 
       9
      / \      when you switch to the right side
    5    13    take care of the left side first (13 & 11)
   / \*  / \
  3  7  11  15
  */
};

//recursion is not costly at this point, BST data structure lends itself to use recursive 

//any tree's runtime is log(n)

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
*/

//1. Find the middle of the array, make that the root
//2. Recursively do below until it meets base case:
//Take the left side of the middle and then find its middle and make that the left child of the root
//3. Recursively do below until it meets base case:
//Take the right side of the middle and then find its middle and make that the right child of the root
//4. Return the tree


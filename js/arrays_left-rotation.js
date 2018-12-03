/**
 * A left rotation operation on an array shifts each of the array's elements  unit to the left.
 * For example, if left rotations are performed on array [1,2,3,4,5],
 * then the array would become [3,4,5,1,2].
 * Given an array  of  integers and a number, , perform  left rotations on the array.
 * Return the updated array to be printed as a single line of space-separated integers.
 * @param {array} a  ej. [1, 2, 3, 4, 5]
 * @param {string} d space separated numbers, [length of the array, number of left turns to do]
 */
function rotateLeft(a, d) {
  const size = parseInt(d.split(' ')[0], 10);
  let moves = parseInt(d.split(' ')[1], 10);

  // Check bad input
  if (size !== a.length) return false;

  // Check moves bigger than array length
  if (moves > size) moves %= size;

  // Cut the part that goes at the start at the new array
  const firstPart = a.splice(moves);
  const result = firstPart.concat(a);

  return result;
}

export default rotateLeft;

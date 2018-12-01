function minMaxSum(arr = [2, 1, 5, 4, 3]) {
  // Check if arr has the correct lenght, otherwise return false
  if (arr.length !== 5) return false;
  // Check if arr only contains numbers, otherwise return false
  const checkNumbers = arr.map(element => typeof element === 'number');
  if (checkNumbers.includes(false)) return false;

  // Store the numbers in ascendent order to to get the min sum
  const minArr = arr.sort((a, b) => a - b).slice(0, 4);
  const minSum = minArr.reduce((acc, curr) => acc + curr);

  // Store the numbers in descendent order to to get the max sum
  const maxArr = arr.sort((a, b) => b - a).slice(0, 4);
  const maxSum = maxArr.reduce((acc, curr) => acc + curr);

  return `${String(minSum)} ${String(maxSum)}`;
}

export default minMaxSum;

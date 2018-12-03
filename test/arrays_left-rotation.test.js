import rotateLeft from '../js/arrays_left-rotation';

describe('Array rotate left', () => {
  const firstResult = rotateLeft([1, 2, 3, 4, 5], '5 4');
  const secondResult = rotateLeft([1, 2, 3, 4, 5], '5 8');
  const thirdResult = rotateLeft([1, 2, 3, 4, 5], '5 21');
  const fourthCase = rotateLeft([41, 73, 89, 7, 10, 1, 59, 58, 84, 77, 77, 97, 58, 1, 86, 58, 26, 10, 86, 51], '20 10');
  const fifthCase = rotateLeft([33, 47, 70, 37, 8, 53, 13, 93, 71, 72, 51, 100, 60, 87, 97], '15 13');

  test('it should return an array', () => {
    expect(firstResult).toBeTruthy();
    expect(Array.isArray(firstResult)).toBe(true);
  });

  test('it should return false if the length given is different from the array\'s length', () => {
    const badInput = rotateLeft([1, 2, 3, 4, 5], '8 4');
    expect(badInput).toBe(false);
  });

  test('should rotate correctly to the left the given times', () => {
    expect(firstResult).toEqual([5, 1, 2, 3, 4]);
    expect(secondResult).toEqual([4, 5, 1, 2, 3]);
    expect(thirdResult).toEqual([2, 3, 4, 5, 1]);
    expect(fourthCase).toEqual([
      77, 97, 58, 1, 86, 58, 26, 10, 86, 51, 41, 73, 89, 7, 10, 1, 59, 58, 84, 77,
    ]);
    expect(fifthCase).toEqual([87, 97, 33, 47, 70, 37, 8, 53, 13, 93, 71, 72, 51, 100, 60]);
  });
});

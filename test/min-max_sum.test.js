import minMaxSum from '../js/min-max_sum';

describe('Min-Max Sum', () => {
  test('it should return a value', () => {
    expect(minMaxSum()).toBeTruthy();
  });

  test('it should only work with an array of length 5', () => {
    expect(minMaxSum([2, 4, 6, 7])).toBe(false);
    expect(minMaxSum([2, 4, 6, 7, 2, 9])).toBe(false);
  });

  test('it should only accept numbers inside the array', () => {
    expect(minMaxSum([2, 3, 4, 'hello', [3, 2]])).toBe(false);
  });

  test('it should return the correct min and max sum values separated by a space', () => {
    expect(minMaxSum()).toEqual('10 14');
    expect(minMaxSum([1, 3, 5, 7, 9])).toEqual('16 24');
    expect(minMaxSum([7, 69, 2, 221, 8974])).toEqual('299 9271');
  });
});

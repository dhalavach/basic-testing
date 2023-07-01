import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 18, b: 2, action: Action.Divide, expected: 9 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 3, b: 0, action: Action.Multiply, expected: 0 },
  { a: 6, b: -2, action: Action.Multiply, expected: -12 },
  { a: -2, b: -3, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 32, action: Action.Exponentiate, expected: 4294967296 },
  { a: 6, b: 2, action: 'non-existent action', expected: null },
  { a: 'foobar', b: true, action: Action.Divide, expected: null },
];

describe.each(testCases)('.calculate(%i, %i)', ({ a, b, action, expected }) => {
  test(`returns ${expected}`, () => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });
});

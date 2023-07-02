import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const mockLinkedList = generateLinkedList([1]);
    expect(mockLinkedList).toStrictEqual({
      next: { next: null, value: null },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const mockLinkedList = generateLinkedList([1, 2]);
    expect(mockLinkedList).toMatchSnapshot({
      next: { next: { next: null, value: null }, value: 2 },
      value: 1,
    });
  });
});

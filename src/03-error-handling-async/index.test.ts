import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

// import {
//   resolveValue,
//   throwError,
//   throwCustomError,
//   MyAwesomeError,
//   rejectCustomError
// } from '03-error-handling-async';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = await resolveValue('value');
    expect(value).toBe('value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => {
      throwError('test error message');
    }).toThrow('test error message');
  });
});

describe('throwError', () => {
  test('should throw error with default message if no message is provided', () => {
    expect(() => {
      throwError();
    }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});

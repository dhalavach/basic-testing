// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fsPromises from 'fs/promises';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(jest.fn(), 50);
    expect(setTimeout).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(jest.fn(), 50);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(jest.fn(), 500);
    expect(setInterval).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockFunction = jest.fn();
    doStuffByInterval(mockFunction, 1000);
    jest.advanceTimersByTime(3000);
    expect(mockFunction).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should return file content if file exists', async () => {
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('mock data');
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const res = await readFileAsynchronously('./path/mock.txt');
    expect(res).toBe('mock data');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    // jest.spyOn(fsPromises, 'readFile').mockResolvedValue(null);
    const res = await readFileAsynchronously('./path/asdf.txt');
    expect(res).toBeNull();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = './path/mock.txt';

    jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });
});

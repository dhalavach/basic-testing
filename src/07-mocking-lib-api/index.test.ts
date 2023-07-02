// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    axios.Axios.prototype.get = jest.fn().mockResolvedValue('asdf');
    await throttledGetDataFromApi('/');
    jest.runAllTimers();
    expect(axiosSpy).toHaveBeenCalled();
    jest.clearAllMocks();
  });

  test('should perform request to correct provided url', async () => {
    axios.Axios.prototype.get = jest.fn().mockResolvedValue('asdf');
    const axiosSpy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/mock-url');
    jest.runAllTimers();
    expect(axiosSpy).toHaveBeenCalled();
    jest.clearAllMocks();
  });

  test('should return response data', async () => {
    axios.Axios.prototype.get = jest
      .fn()
      .mockResolvedValue({ data: 'mock data' });
    const mockData = await throttledGetDataFromApi('/');
    jest.runAllTimers();
    expect(mockData).toBe('mock data');
  });
});

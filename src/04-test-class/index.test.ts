// Uncomment the code below and write your tests
// import _ from 'lodash';
import { BankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = new BankAccount(5);
    expect(account.getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(1);
    expect(() => {
      account.withdraw(100);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const senderAccount = new BankAccount(1);
    const receiverAccount = new BankAccount(0);
    expect(() => {
      senderAccount.transfer(100, receiverAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const senderAccount = new BankAccount(1);
    expect(() => {
      senderAccount.transfer(1, senderAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = new BankAccount(0);
    account.deposit(5);
    expect(account.getBalance()).toBe(5);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(10);
    account.withdraw(3);
    expect(account.getBalance()).toBe(7);
  });

  test('should transfer money', () => {
    const senderAccount = new BankAccount(10);
    const receiverAccount = new BankAccount(2);

    senderAccount.transfer(3, receiverAccount);

    expect(senderAccount.getBalance()).toBe(7);
    expect(receiverAccount.getBalance()).toBe(5);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(1);
    expect(account.fetchBalance()).resolves.not.toBeNaN();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(1);
    expect(account.synchronizeBalance()).resolves;
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = new BankAccount(10);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);

    try {
      await acc.synchronizeBalance();
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toEqual('Synchronization failed');
      }
    }
  });
});

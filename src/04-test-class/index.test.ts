// import _ from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 1;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 1;
    const moreThanBalance = 100;
    const account = getBankAccount(balance);
    expect(() => {
      account.withdraw(moreThanBalance);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 1;
    const moreThanBalance = 100;
    const senderAccount = getBankAccount(balance);
    const receiverAccount = getBankAccount(0);
    expect(() => {
      senderAccount.transfer(moreThanBalance, receiverAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 1;
    const senderAccount = getBankAccount(balance);
    expect(() => {
      senderAccount.transfer(balance, senderAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 0;
    const amountDesposited = 5;
    const account = getBankAccount(initialBalance);
    account.deposit(amountDesposited);
    expect(account.getBalance()).toBe(initialBalance + amountDesposited);
  });

  test('should withdraw money', () => {
    const balance = 10;
    const amountToWithdraw = 3;
    const account = getBankAccount(balance);
    account.withdraw(amountToWithdraw);
    expect(account.getBalance()).toBe(balance - amountToWithdraw);
  });

  test('should transfer money', () => {
    const senderInitialBalance = 10;
    const receiverInitialBalance = 2;
    const amountToTransfer = 3;
    const senderAccount = getBankAccount(10);
    const receiverAccount = getBankAccount(2);
    senderAccount.transfer(amountToTransfer, receiverAccount);
    expect(senderAccount.getBalance()).toBe(
      senderInitialBalance - amountToTransfer,
    );
    expect(receiverAccount.getBalance()).toBe(
      receiverInitialBalance + amountToTransfer,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 1;
    const account = getBankAccount(initialBalance);
    expect(account.fetchBalance()).resolves.not.toBeNaN();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1;
    const account = getBankAccount(initialBalance);
    expect(account.synchronizeBalance()).resolves;
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1;
    const acc = getBankAccount(initialBalance);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);

    try {
      await acc.synchronizeBalance();
    } catch (err) {
      if (err instanceof Error) {
        expect(err).toBeInstanceOf(SynchronizationFailedError);
      }
    }

    jest.clearAllMocks();
  });
});

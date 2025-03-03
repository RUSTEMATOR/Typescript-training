import { Bank, Client, BankAccount, DepositCommand, WithdrawCommand, TransactionManager } from './homework18';

describe('Bank', () => {
  let bank: Bank;
  let client: Client;
  let account: BankAccount;

  beforeEach(() => {
    bank = Bank.getInstance();
    client = new Client('John', 'Doe');
    account = bank.createAccount(client, 1000);
    client.addAccount(account);
  });

  test('should create a bank account', () => {
    expect(account.getBalance()).toBe(1000);
    expect(account.getOwner()).toBe(client);
  });

  test('should close a bank account', () => {
    bank.closeAccount(account.accountNumber);
    expect(bank['accounts'].has(account.accountNumber)).toBe(false);
  });
});

describe('Client', () => {
  let client: Client;
  let account: BankAccount;

  beforeEach(() => {
    client = new Client('Jane', 'Doe');
    account = new BankAccount(client, 500);
    client.addAccount(account);
  });

  test('should get full name', () => {
    expect(client.getFullName()).toBe('Doe, Jane');
  });

  test('should add and remove account', () => {
    expect(client['accounts'].has(account.accountNumber)).toBe(true);
    client.removeAccount(account);
    expect(client['accounts'].has(account.accountNumber)).toBe(false);
  });
});

describe('BankAccount', () => {
  let client: Client;
  let account: BankAccount;

  beforeEach(() => {
    client = new Client('John', 'Smith');
    account = new BankAccount(client, 1000);
  });

  test('should deposit money', () => {
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    account.withdraw(300);
    expect(account.getBalance()).toBe(700);
  });

  test('should not withdraw money if insufficient funds', () => {
    account.withdraw(1500);
    expect(account.getBalance()).toBe(1000);
  });
});

describe('TransactionManager', () => {
  let client: Client;
  let account: BankAccount;
  let transactionManager: TransactionManager;

  beforeEach(() => {
    client = new Client('John', 'Doe');
    account = new BankAccount(client, 1000);
    transactionManager = new TransactionManager();
  });

  test('should execute deposit command', () => {
    const deposit = new DepositCommand(account, 500);
    transactionManager.execute(deposit);
    expect(account.getBalance()).toBe(1500);
  });

  test('should execute withdraw command', () => {
    const withdraw = new WithdrawCommand(account, 200);
    transactionManager.execute(withdraw);
    expect(account.getBalance()).toBe(800);
  });

  test('should undo last transaction', () => {
    const deposit = new DepositCommand(account, 500);
    transactionManager.execute(deposit);
    transactionManager.undo();
    expect(account.getBalance()).toBe(1000);
  });

  test('should redo last undone transaction', () => {
    const deposit = new DepositCommand(account, 500);
    transactionManager.execute(deposit);
    transactionManager.undo();
    transactionManager.redo();
    expect(account.getBalance()).toBe(1500);
  });
});
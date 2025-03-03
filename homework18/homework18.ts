export class Bank {
    private static instance: Bank
    private accounts: Map<string, BankAccount> = new Map()

    private constructor() {}

    public static getInstance(): Bank {
        if (!Bank.instance){
            Bank.instance = new Bank
        }
        return Bank.instance
    }

    public account(owner: Client, initialBalance: number): BankAccount{
        const account = new BankAccount(owner, initialBalance)
        this.accounts.set(account.accountNumber, account)
        return account
    }

    public createAccount(owner: Client, initialBalance: number): BankAccount {
        const account = new BankAccount(owner, initialBalance);
        this.accounts.set(account.accountNumber, account);
        return account;
      }

    public closeAccount(accountNumber: string): void {
        if (this.accounts.has(accountNumber)){
            this.accounts.delete(accountNumber)
            console.info(`Account ${accountNumber} closed.`);
        } else {
            console.warn(`Account ${accountNumber} not found.`);
        }
    }
}

export class Client {
    private firstName: string 
    private lastName: string
    private accounts: Map<string, BankAccount> = new Map()

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }

    public getFullName(): string {
        return `${this.lastName}, ${this.firstName}`
    }

    public addAccount(account: BankAccount): void {
        this.accounts.set(account.accountNumber, account)
    }

    public removeAccount(account: BankAccount): void {
        this.accounts.delete(account.accountNumber)
    }
}

export class BankAccount {
    private _balance: number
    private _owner: Client;
    public readonly accountNumber: string

    constructor(owner: Client, initialBalance: number) {
        this._owner = owner
        this._balance = initialBalance
        this.accountNumber = this.generateAccountNumber()
    }

    public getBalance(): number {
        return this._balance;
    }

    public getOwner(): Client {
        return this._owner;
    }
    private generateAccountNumber(): string {
        return `ACC-${Math.floor(Math.random() * 10000)}`;
    }

    public deposit(amount: number): void {
        this._balance += amount
        console.info(`Deposit: ${amount}. New Balance: ${this._balance}`);
    }

    public withdraw(amount: number): void {
        if (amount > this._balance) {
          console.warn("Insufficient funds");
          return;
        }
        this._balance -= amount
        console.info(`Withdraw: ${amount}. New Balance: ${this._balance}`);
      }
}


export interface ICommand {
    execute(): void;
    undo(): void;
  }
  
export class DepositCommand implements ICommand {
    constructor(private account: BankAccount, private amount: number) {}
    execute(): void {
      this.account.deposit(this.amount);
    }
    undo(): void {
      this.account.withdraw(this.amount);
    }
  }
  
export class WithdrawCommand implements ICommand {
    constructor(private account: BankAccount, private amount: number) {}
    execute(): void {
      this.account.withdraw(this.amount);
    }
    undo(): void {
      this.account.deposit(this.amount);
    }
  }

export class TransactionManager {
    private history: ICommand[] = [];
    private undone: ICommand[] = [];
  
    execute(command: ICommand): void {
      command.execute();
      this.history.push(command);
      this.undone = []; // Clear redo stack
    }
    
    undo(): void {
      const command = this.history.pop();
      if (command) {
        command.undo();
        this.undone.push(command);
      }
    }
    
    redo(): void {
      const command = this.undone.pop();
      if (command) {
        command.execute();
        this.history.push(command);
      }
    }
  }



const bank = Bank.getInstance();
const client1 = new Client("John", "Doe");
const account1 = bank.createAccount(client1, 1000);
client1.addAccount(account1);
console.log(`${client1.getFullName()} created account ${account1.accountNumber} with balance ${account1.getBalance()}`);

const transactionManager = new TransactionManager();
const deposit = new DepositCommand(account1, 500);
transactionManager.execute(deposit);

const withdraw = new WithdrawCommand(account1, 200);
transactionManager.execute(withdraw);

console.log(`Balance after transactions: ${account1.getBalance()}`);
transactionManager.undo();
console.log(`Balance after undo: ${account1.getBalance()}`);
transactionManager.redo();
console.log(`Balance after redo: ${account1.getBalance()}`);

bank.closeAccount(account1.accountNumber);
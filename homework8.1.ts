interface Result<T> {
    status: 'success' | 'error';
    data?: T;
    error$?: string;
}

async function handleResult(result: Result<Object>) {
    switch (result.status){
        case 'success':
            console.log(result.data);
            return result.data;
        case 'error':
            console.error(result.error$);
            break;
        default:
            console.error('Unknown result status');
            break;
    }
}

//------------------------------------------------------------------------------------------------

class Queue<T>{
    private items: Array<T> = [];

    constructor(){}

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    size(): number {
        return this.items.length;
    } 
}



//------------------------------------------------------------------------------------------------ 



function sortArray<T>(arr: Array<T>, compareFn: (a: T, b: T) => number): Array<T> {

    const arrCopy = [...arr]

    arrCopy.sort(compareFn)

    return arrCopy
}


//------------------------------------------------------------------------------------------------
interface IUser {
    name: string;
    age: number;
}


function extractProperty<T extends IUser, K extends keyof T>(array: Array<T>, key: K): Array<T[K]>{
    return array.map(item => item[key])
}


//------------------------------------------------------------------------------------------------
interface IIdentifiable {
    id: number; 
}


class Repository <T extends IIdentifiable> {
    private items: Array<T> = [];

    add(item: T): void {
        if (this.items.some(existingItem => existingItem.id === item.id)){
            throw new Error("Item already exists in repository");
        } else {
            this.items.push(item);
        }  
    }

    getById(id: number): T | undefined {
        const item = this.items.find(item => item.id === id);
        if(item === undefined) {
            throw new Error("Repository is empty");
        } 
        else if (!item){
            throw new Error("Item not found in repository");    
        }
        else {
            return this.items.find(item => item.id === id);
        }
    }

    removeById(id: number): boolean {
        const item = this.items.find(item => item.id === id);
        if(item === undefined) {
            console.error("Repository is empty");
            return false
        } 
        else if (!item){
            console.error("Item not found in repository"); 
            return false;   
        }
        else {
            this.items = this.items.filter(item => item.id !== id);
            return true;
        }
    }

    getAll(): Array<T> {
        return [...this.items];
    }
}

class User implements IIdentifiable {
    id: number;
    name: string;
    
    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }
}

class Product implements IIdentifiable {
    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

const userRepository = new Repository<User>()

userRepository.add(new User(1, 'Administ'))
userRepository.add(new User(2, 'Dan'))

console.log(userRepository.getById(1))
console.log('')
console.log(userRepository.getById(2))
console.log('')
userRepository.removeById(2)
console.log(userRepository.getAll())
console.log('')


const productRepository = new Repository<Product>()

productRepository.add(new Product(1, 'Apple', 2.5))
productRepository.add(new Product(2, 'Banana', 1.5))

console.log(productRepository.getById(1))
console.log('')
console.log(productRepository.getById(2))
console.log('')
productRepository.removeById(2)
console.log(productRepository.getAll())



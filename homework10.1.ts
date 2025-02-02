function sortArray<T>(arr: Array<T>, compareFnOrKey: (a: T, b: T) => number): Array<T>
function sortArray<T>(arr: Array<T>, key: keyof T): Array<T>
function sortArray<T>(arr: Array<T>, compareFnOrKey: ((a: T, b: T) => number) | keyof T): Array<T> {
    const arrCopy = [...arr]

    if (typeof compareFnOrKey === 'function'){
        arrCopy.sort(compareFnOrKey)
    } 
    else if (typeof compareFnOrKey === 'string'){
        arrCopy.sort((a, b) => {
            if (a[compareFnOrKey] < b[compareFnOrKey]) {
                return -1
            }
            if (a[compareFnOrKey] > b[compareFnOrKey]) {
                return 1
            }
            return 0
        })
    }

    return arrCopy
}


const numbers = [3, 1, 2, 5, 4];
console.log(sortArray(numbers, (a, b) => a - b));

const students = [
  { name: 'Alice', grade: 85 },
  { name: 'Bob', grade: 90 },
  { name: 'Charlie', grade: 75 }
];
console.log(sortArray(students, 'grade')); 

//------------------------------------------------------------------------------------------------


type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]>: T[P]
}

interface IUser {
    name: string;
    age: string;
    address: {
        city: string;
        country: string;
    }
}


const User: DeepReadonly<IUser> = {
    name: 'John',
    age: '23',
    address: {
        city: 'Babuba',
        country: 'Dadndi'
    }
}

//------------------------------------------------------------------------------------------------


type DeepRequireReadonly<T> = {
    readonly [P in keyof T]-?: T[P]
}


//------------------------------------------------------------------------------------------------


type PartialByKeys<T, K extends keyof T> = {
    [P in keyof T as P extends K ? P : never]?: T[P]
} & {
    [P in keyof T as P extends K ? never : P]: T[P]
}

//------------------------------------------------------------------------------------------------

type ReadonlyByKeys<T, K extends keyof T> = {
    readonly [P in keyof T as P extends K ? P : never]: T[P]
} & {
    [P in keyof T as P extends K? never : P]: T[P]
}

//------------------------------------------------------------------------------------------------

type MutableByKeys<T, K extends keyof T> = {
    -readonly [P in keyof T as P extends K ? P : never ]: T[P]
} & {
    [P in keyof T as P extends K ? never : P]: T[P]
}

//------------------------------------------------------------------------------------------------

type UpperCaseKeys<T> = {
    [P in keyof T as P extends `${Uppercase<string & P>}`? P : never]: T[P]
}

//------------------------------------------------------------------------------------------------
type PropertyDescriptorr<T> = {
    value: T
    writable?: boolean
    enumerable?: boolean
    configurable?: boolean
}

type ObjectToPropertyDescriptor<T> = {
    [P in keyof T]: PropertyDescriptorr<T[P]>
}
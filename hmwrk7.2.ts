
interface IPerson {
    name: string;
    age: number;
}

function assertNotNil<T>(value: T | null | undefined, message: string): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error(message);
    }  
}

function fetchData(): unknown {
    return {
        name: 'John Doe',
        age: 30
    }   
}

const data = fetchData() as {name: string, age: number}

//or

const data2 = fetchData()

const person = data2 as {name: string, age: number}

console.log(person.name, person.age)

//or

const person2 = data2 as IPerson




function printPersonInfo(person: IPerson | null | undefined): IPerson {
   
    const nameOfPerson = person?.name

    const ageOfPerson = person?.age

    assertNotNil(nameOfPerson, 'Name is required');
    assertNotNil(ageOfPerson, 'Age is required');

    console.log({name: nameOfPerson, age: ageOfPerson});
    return {name: nameOfPerson, age: ageOfPerson}

} 


printPersonInfo(person)
printPersonInfo(person2)
printPersonInfo(data)

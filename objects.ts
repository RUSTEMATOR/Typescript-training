
type TypeUser = {
    name: string,
    age: number, 
}


type TypeAddress = {
    city: string,
    country: string
}



const user: TypeUser = {
    name: 'John Doe',
    age: 30,
}

const address: TypeAddress = {
    city: 'New York',
    country: 'USA',
}


let common: TypeUser & TypeAddress

common = {
    ...user,
    ...address,
}

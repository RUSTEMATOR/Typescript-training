interface IUser extends IUserAge {
    name: string;
    email: string;
}

interface IUserAge {
    age?: number;
}


const user: IUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
}


// const users: IUser[] = [{

// }]
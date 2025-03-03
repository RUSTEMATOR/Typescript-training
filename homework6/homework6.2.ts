export type CreateUser = {
    type: 'CREATE_USER',
    payload: { name: string, age: number } 
}

export type UpdateUser = {
    type: 'UPDATE_USER',
    payload: { userId: number, name?: string, age?: number } 
}

export type DeleteUser = {
    type: 'DELETE_USER',
    payload: { userId: number } 
}

export type BlockUser = {
    type: 'BLOCK_USER',
    payload: { userId: number, reason: string } 
}

export type Action = CreateUser | UpdateUser | DeleteUser | BlockUser 

export function handleAction(action: Action) {
    switch (action.type){
        case 'CREATE_USER': 
            console.log(action.type)
            if(action.payload.name && action.payload.age){
                console.log(`Creating user with name: ${action.payload.name} and age: ${action.payload.age}`);
            } else {
                console.log('Missing parameters, name and age must be provided');
            }
            break;
        
        case 'UPDATE_USER':
            console.log(action.type)
            console.log(`Updating user with id: ${action.payload.userId}`);
            if (action.payload.name) {
                console.log(`New name: ${action.payload.name}`);
            }
            if (action.payload.age) {
                console.log(`New age: ${action.payload.age}`);
            }
            if (action.payload.age && action.payload.name){
                console.log(`New name and age: ${action.payload.name} and ${action.payload.age}`);
            }
            if (action.payload.name === undefined && action.payload.age === undefined) {
                console.log('No changes made, no parameters have been provided');
            }
            break;

        case 'DELETE_USER': 
            console.log(action.type)
            if (action.payload.userId){
                console.log(`Deleting user with id: ${action.payload.userId}`);
            } else {
                console.log('No parameters have been provided');
            }
            break;
        
        case 'BLOCK_USER':
            console.log(action.type)
            if (action.payload.userId && action.payload.reason){
                console.log(`Blocking user with id: ${action.payload.userId} for reason: ${action.payload.reason}`);
            } else {
                console.log('Missing parameters, userId and reason must be provided');
            }
            break;

        default:
            const _exhaustiveCheck: never = action;
            throw new Error(`Unhandled action type: ${_exhaustiveCheck}`);
    }
}


console.log('--- CREATE_USER with valid parameters ---');
handleAction({ type: 'CREATE_USER', payload: { name: 'John Doe', age: 30 } });
console.log('');

console.log('--- CREATE_USER with missing parameters ---');
handleAction({ type: 'CREATE_USER', payload: { name: '', age: 0 } });
console.log('');

console.log('--- UPDATE_USER with valid parameters ---');
handleAction({ type: 'UPDATE_USER', payload: { userId: 1, name: 'Jane Doe', age: 25 } });
console.log('');

console.log('--- UPDATE_USER with no changes ---');
handleAction({ type: 'UPDATE_USER', payload: { userId: 1 } });
console.log('');

console.log('--- DELETE_USER with valid parameters ---');
handleAction({ type: 'DELETE_USER', payload: { userId: 1 } });
console.log('');

console.log('--- DELETE_USER with missing parameters ---');
handleAction({ type: 'DELETE_USER', payload: { userId: 0 } });
console.log('');

console.log('--- BLOCK_USER with valid parameters ---');
handleAction({ type: 'BLOCK_USER', payload: { userId: 2, reason: 'Violation of terms' } });
console.log('');

console.log('--- BLOCK_USER with missing parameters ---');
handleAction({ type: 'BLOCK_USER', payload: { userId: 0, reason: '' } });
console.log('');

console.log('--- UNKNOWN_ACTION ---');
try {
    handleAction({ type: 'UNKNOWN_ACTION', payload: {} } as any);
} catch (error) {
    console.log(error);
}



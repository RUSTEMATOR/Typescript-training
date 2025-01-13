
type User = {
    username: string;
    password: string;
  };
  
type Guest = {
    sessionId: string;
  };

type Admin = {
    username: string;
    password: string;
    role: 'admin'
}

type ExternalUser = {
    oauthToken: string;
}

type UserKinds = User | Guest | Admin | ExternalUser


function login(entity: UserKinds): void {
    if ('sessionId' in entity){
        console.log(`User with sessionId: ${entity.sessionId} logged in.`);
    }

    else if ('role' in entity && entity.role === 'admin'){
        console.log(`Logged in as admin with username: ${entity.username} and password: ${entity.password}`) 
    }

    else if ('password' in entity){
        console.log(`User with username: ${entity.username} and password: ${entity.password} logged in.`);
    }

    else if ('oauthToken' in entity){
        console.log(`Logged in using external user with oauth token: ${entity.oauthToken}`)
    }

}


type UserDisc = {
    type: 'User'
    username: string;
    password: string;
  };
  
type GuestDisc = {
    type: 'Guest'
    sessionId: string;
  };

type AdministratorDisc = {
    type: 'Admin'
    username: string;
    password: string;
    role: 'admin'
}

type ExternalUserDisc = {
    type: 'ExternalUser'
    oauthToken: string;
}

type UserKindDisc = UserDisc | GuestDisc | AdministratorDisc | ExternalUserDisc

function logInDiscriminator(entity: UserKindDisc): void {
    switch (entity.type) {
        case 'User':
            console.log(`User with username: ${entity.username} and password: ${entity.password} logged in.`);
            break;
        case 'Guest':
            console.log(`User with sessionId: ${entity.sessionId} logged in.`);
            break;
        case 'Admin':
            console.log(`Logged in as admin with username: ${entity.username} and password: ${entity.password}`) 
            break;
        case 'ExternalUser':
            console.log(`Logged in using external user with oauth token: ${entity.oauthToken}`)
            break;
        default:
            throw new Error(`Unhandled entity: ${entity}`);
    }
}
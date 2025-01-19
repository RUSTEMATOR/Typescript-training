enum UsersEnum {
    User = 'user',
    Guest = 'guest',
    Admin = 'admin',
    ExternalUser = 'externalUser'
}

class User {
    public readonly type: UsersEnum = UsersEnum.User

    public readonly username: string;
    public readonly password: string;


    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
  };
  
class Guest  {
    public readonly type: UsersEnum = UsersEnum.Guest

    public readonly sessionId: string;

    constructor(sessionId: string) {
        this.sessionId = sessionId;
    }
  };

class Admin {
    public readonly type: UsersEnum = UsersEnum.Admin

    public readonly username: string;
    public readonly password: string;
    public readonly role: string

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
        this.role = 'admin';
    }
}

class ExternalUser {
    public readonly type: UsersEnum = UsersEnum.ExternalUser

    public readonly oauthToken: string;

    constructor(oauthToken: string) {
        this.oauthToken = oauthToken;
    }
}

type UserTypes = User | Guest | Admin | ExternalUser


function login(entity: UserTypes): void {
    if (entity instanceof Guest){
        console.log(`User with sessionId: ${entity.sessionId} logged in.`);
    }

    else if (entity instanceof Admin){
        console.log(`Logged in as admin with username: ${entity.username} and password: ${entity.password}`) 
    }

    else if (entity instanceof User){
        console.log(`User with username: ${entity.username} and password: ${entity.password} logged in.`);
    }

    else if (entity instanceof ExternalUser){
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
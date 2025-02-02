// enum UsersEnum {
//     User = 'user',
//     Guest = 'guest',
//     Admin = 'admin',
//     ExternalUser = 'externalUser'
// }

// class User {
//     public readonly type: UsersEnum = UsersEnum.User

//     public readonly username: string;
//     public readonly password: string;


//     constructor(username: string, password: string) {
//         this.username = username;
//         this.password = password;
//     }

//     public static isUser(value: unknown): value is User {
//         return Boolean(
//             value &&
//                 typeof value === "object" &&
//                 "type" in value &&
//                 value.type === UsersEnum.User &&
//                 "username" in value &&
//                 "password" in value
                
//         )
//   };
// }
  
// class Guest  {
//     public readonly type: UsersEnum = UsersEnum.Guest

//     public readonly sessionId: string;

//     constructor(sessionId: string) {
//         this.sessionId = sessionId;
//     }

//     public static isGuest(value: unknown): value is Guest {
//         return Boolean(
//             value &&
//                 typeof value === "object" &&
//                 "type" in value &&
//                 value.type === UsersEnum.Guest &&
//                 "sessionId" in value
                
//         )
//   };
// }

// class Admin {
//     public readonly type: UsersEnum = UsersEnum.Admin

//     public readonly username: string;
//     public readonly password: string;
//     public readonly role: string

//     constructor(username: string, password: string) {
//         this.username = username;
//         this.password = password;
//         this.role = 'admin';
//     }

//     public static isAdmin(value: unknown): value is Admin {
//         return Boolean(
//             value &&
//                 typeof value === "object" &&
//                 "type" in value &&
//                 value.type === UsersEnum.Admin &&
//                 "username" in value &&
//                 "password" in value &&
//                 "role" in value &&
//                 value.role === 'admin'   
//         )
//   };
// }

// class ExternalUser {
//     public readonly type: UsersEnum = UsersEnum.ExternalUser

//     public readonly oauthToken: string;

//     constructor(oauthToken: string) {
//         this.oauthToken = oauthToken;
//     }

//     public static isExternalUser(value: unknown): value is ExternalUser {
//         return Boolean(
//             value &&
//                 typeof value === "object" &&
//                 "type" in value &&
//                 value.type === UsersEnum.ExternalUser &&
//                 "oauthToken" in value
                
//         )
//   };
// }

// type UserTypes = User | Guest | Admin | ExternalUser


// function login(entity: UserTypes): void {
//     if (Guest.isGuest(entity)){
//         console.log(`User with sessionId: ${entity.sessionId} logged in.`);
//     }

//     else if (Admin.isAdmin(entity)){
//         console.log(`Logged in as admin with username: ${entity.username} and password: ${entity.password}`) 
//     }

//     else if (User.isUser(entity)){
//         console.log(`User with username: ${entity.username} and password: ${entity.password} logged in.`);
//     }

//     else if (ExternalUser.isExternalUser(entity)){
//         console.log(`Logged in using external user with oauth token: ${entity.oauthToken}`)
//     }

// }


// type UserDisc = {
//     type: 'User'
//     username: string;
//     password: string;
//   };
  
// type GuestDisc = {
//     type: 'Guest'
//     sessionId: string;
//   };

// type AdministratorDisc = {
//     type: 'Admin'
//     username: string;
//     password: string;
//     role: 'admin'
// }

// type ExternalUserDisc = {
//     type: 'ExternalUser'
//     oauthToken: string;
// }

// type UserKindDisc = UserDisc | GuestDisc | AdministratorDisc | ExternalUserDisc

// function logInDiscriminator(entity: UserKindDisc): void {
//     switch (entity.type) {
//         case 'User':
//             console.log(`User with username: ${entity.username} and password: ${entity.password} logged in.`);
//             break;
//         case 'Guest':
//             console.log(`User with sessionId: ${entity.sessionId} logged in.`);
//             break;
//         case 'Admin':
//             console.log(`Logged in as admin with username: ${entity.username} and password: ${entity.password}`) 
//             break;
//         case 'ExternalUser':
//             console.log(`Logged in using external user with oauth token: ${entity.oauthToken}`)
//             break;
//         default:
//             throw new Error(`Unhandled entity: ${entity}`);
//     }
// }
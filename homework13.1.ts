// //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// class Human {

//     public name: string = 'John'
//     public surname: string = 'Doe'

//     @DeprecatedMethods({deprecationReason: 'Redundant method', replacementMethodName: 'human.introduce()'})
//     public sayName() {
//         console.log(this.name)
        
//     }

//     public introduce() {
//         console.log(`Hi, my name is ${this.name} ${this.surname}`)
        
//     }
    
// }


function DeprecatedMethods ({deprecationReason, replacementMethodName }: 
    {deprecationReason: string, replacementMethodName?: string}) {

return function <Type, Arguments extends any[], Return>
(originalMethod: (...args: Arguments) => Return, 
context: ClassMethodDecoratorContext<Type, (...args: Arguments) => Return>)

{
if (context.kind != 'method'){
throw new Error('Decorator can only be used on methods') 
}

function replacementMethods(this: Type, ...args: Arguments): Return {
console.warn(`Warning: ${String(context.name)} is deprecated. Reason: ${deprecationReason}. Use ${replacementMethodName} instead`)
return originalMethod.apply(this, args)
}

return replacementMethods
        
}
}

// // const human = new Human();
// // human.sayName()

// // human.introduce()
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// function MinLength(minLength: number) {
//     return function <Type> (originalMethod: (value: string) => void, context: ClassSetterDecoratorContext) {
//             return function (this: Type, value: string) {
//                 if (value.toString().length < 10){
//                     throw new Error(`Value must be at least 10 characters long`)
//                 }

//                 return originalMethod.apply(this, [value])
//             }
//         }
// }

// function MaxLength(maxLength: number) {
//     return function <Type> (originalMethod: (value: string) => void, context: ClassSetterDecoratorContext) {
//         return function (this: Type, value: string) {
//             if (value.toString().length > maxLength){
//                 throw new Error(`Value must be not greater than 123`)
//             }
//             return originalMethod.apply(this, [value])
//         }
//     }
// } 

// function Email<Type>(originalMethod: (val: string) => void, context: ClassSetterDecoratorContext) {
//         return function (this: Type, value: string) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!emailRegex.test(value)) {
//             throw new Error(`The value of ${value} should be a valid email address.`);
//         }
//         return originalMethod.apply(this, [value]);
//     }
// }


// class BasicUser {
//     private _email: string = '';
//     private _password: string = '';

    
//     @MaxLength(15)
//     @MinLength(10)
//     @Email
//     public set email(value: string) {
//         this._email = value;
//     }

//     public get email(): string {
//         return this._email;
//     }

//     @MaxLength(15)
//     @MinLength(10)
//     public set password(value: string) {
//         this._password = value;
//     }

//     public get password(): string {
//         return this._password;
//     }
// }

// // const user = new BasicUser();

// // user.email = 'fgyuga'

// // user.password = '12345'



// //------------------------------------------------------------------------------------------------------------------------

// function DecoratorArray(decorators: ((value: string) => void)[]) {
//     return function <Type> (
//         originalMethod: (value: string) => void,
//         context: ClassSetterDecoratorContext
//     ) {
//         return function (this: Type, value: string) {
//             const errors: string[] = [];

//             for (const decorator of decorators) {
//                 try {
//                     decorator(value);
//                 } catch (error: Error) {
//                     errors.push(error.message);
//                 }
//             }

//             if (errors.length > 0) {
//                 throw new Error(errors.join("; "));
//             }

//             return originalMethod.apply(this, [value]);
//         };
//     };
// }


// function MinLengthModif(minLength: number) {
//             return function (value: string) {
//                 if (value.toString().length < 10){
//                     throw new Error(`Value must be at least 10 characters long`)
//                 }
//             }
//         }

// function MaxLengthModif(maxLength: number) {
//         return function (value: string) {
//             if (value.toString().length > maxLength){
//                 throw new Error(`Value must be not greater than 123`)
//             }
//         }
//     }
 

// function EmailModif(value: string) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!emailRegex.test(value)) {
//             throw new Error(`The value of ${value} should be a valid email address.`);
//         }
//     }


// class BasicUserTwo {
//     private _email: string = '';
//     private _password: string = '';

    
//     @DecoratorArray([MinLengthModif(15), MaxLengthModif(20), EmailModif])
//     public set email(value: string) {
//         this._email = value;
//     }

//     public get email(): string {
//         return this._email;
//     }

//     @DecoratorArray([MinLengthModif(15), MaxLengthModif(20)])
//     public set password(value: string) {
//         this._password = value;
//     }

//     public get password(): string {
//         return this._password;
//     }
// }

// const userTwo = new BasicUserTwo();

// userTwo.email = 'fgyuga'

// userTwo.password = '12345'
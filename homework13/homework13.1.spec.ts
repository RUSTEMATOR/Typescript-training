import { DeprecatedMethods, MinLength, MaxLength, Email, BasicUser, BasicUserTwo, MinLengthModif, MaxLengthModif, EmailModif, DecoratorArray } from './homework13.1';

describe('DeprecatedMethods', () => {
    class TestClass {
        @DeprecatedMethods({ deprecationReason: 'Redundant method', replacementMethodName: 'introduce' })
        public sayName() {
            return 'John';
        }

        public introduce() {
            return 'Hi, my name is John Doe';
        }
    }

    let testInstance: TestClass;
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
        testInstance = new TestClass();
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleWarnSpy.mockRestore();
    });

    test('should warn when deprecated method is called', () => {
        const result = testInstance.sayName();
        expect(consoleWarnSpy).toHaveBeenCalledWith('Warning: sayName is deprecated. Reason: Redundant method. Use introduce instead');
        expect(result).toBe('John');
    });
});

describe('BasicUser', () => {
    let user: BasicUser;

    beforeEach(() => {
        user = new BasicUser();
    });

    test('should throw error for invalid email', () => {
        expect(() => {
            user.email = 'invalidEmail';
        }).toThrow('The value of invalidEmail should be a valid email address.');
    });

    test('should throw error for short email', () => {
        expect(() => {
            user.email = 'a@b.c';
        }).toThrow('Value must be at least 10 characters long');
    });

    test('should throw error for long email', () => {
        expect(() => {
            user.email = 'a'.repeat(16) + '@example.com';
        }).toThrow('Value must be not greater than 123');
    });

    test('should set valid email', () => {
        const validEmail = 'valid@example.com';
        user.email = validEmail;
        expect(user.email).toBe(validEmail);
    });

    test('should throw error for short password', () => {
        expect(() => {
            user.password = 'short';
        }).toThrow('Value must be at least 10 characters long');
    });

    test('should throw error for long password', () => {
        expect(() => {
            user.password = 'a'.repeat(16);
        }).toThrow('Value must be not greater than 123');
    });

    test('should set valid password', () => {
        const validPassword = 'validPassword';
        user.password = validPassword;
        expect(user.password).toBe(validPassword);
    });
});

describe('BasicUserTwo', () => {
    let userTwo: BasicUserTwo;

    beforeEach(() => {
        userTwo = new BasicUserTwo();
    });

    test('should throw error for invalid email', () => {
        expect(() => {
            userTwo.email = 'invalidEmail';
        }).toThrow('The value of invalidEmail should be a valid email address.');
    });

    test('should throw error for short email', () => {
        expect(() => {
            userTwo.email = 'a@b.c';
        }).toThrow('Value must be at least 10 characters long');
    });

    test('should throw error for long email', () => {
        expect(() => {
            userTwo.email = 'a'.repeat(21) + '@example.com';
        }).toThrow('Value must be not greater than 123');
    });

    test('should set valid email', () => {
        const validEmail = 'valid@example.com';
        userTwo.email = validEmail;
        expect(userTwo.email).toBe(validEmail);
    });

    test('should throw error for short password', () => {
        expect(() => {
            userTwo.password = 'short';
        }).toThrow('Value must be at least 10 characters long');
    });

    test('should throw error for long password', () => {
        expect(() => {
            userTwo.password = 'a'.repeat(21);
        }).toThrow('Value must be not greater than 123');
    });

    test('should set valid password', () => {
        const validPassword = 'validPassword';
        userTwo.password = validPassword;
        expect(userTwo.password).toBe(validPassword);
    });
});
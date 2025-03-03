import { appTranslaions, appOptionalTranslations, optionalSomething } from "./homework6.1";

describe('Transactions', () => {

    test('should return the correct translation for a given language code', () => {
        expect(appTranslaions['de']).toBe('Hallo Welt');
        expect(appTranslaions['es']).toBe('Hola Mundo');
    });

    test('should return undefined for a non-existent language code', () => {
        expect(appTranslaions['zh']).toBeUndefined();
    });

    test('should return the default translation if the language code does not exist', () => {
        expect(appOptionalTranslations['zh'] || appOptionalTranslations['default']).toBe('Translation not found');
    });

    test('should return undefined if the language code does not exist and no default is provided', () => {
        expect(optionalSomething['zh'] || optionalSomething['default']).toBeUndefined();
    });

    test('should return the correct translation for a given language code in optional translations', () => {
        expect(appOptionalTranslations['de']).toBe('Hallo Welt');
        expect(appOptionalTranslations['es']).toBe('Hola Mundo');
    });
})
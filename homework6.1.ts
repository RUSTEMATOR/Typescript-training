interface ITranslations {
    [language: string]: string | undefined;
}

interface IOptionalTranslations extends ITranslations {
    [language: string]: string | undefined;
    default?: string;
}


const appTranslaions: ITranslations = {
    en: 'Hello world',
    de: 'Hallo Welt',
    es: 'Hola Mundo',
    fr: 'Bonjour le monde'
}

const appOptionalTranslations: IOptionalTranslations = {
    en: 'Hello world',
    de: 'Hallo Welt',
    es: 'Hola Mundo',
    fr: 'Bonjour le monde',
    default: 'Translation not found'
}

const optionalSomething: IOptionalTranslations = {
    en: 'Hello world',
    de: 'Hallo Welt',
    es: 'Hola Mundo',
    fr: 'Bonjour le monde',
}

const languageCode: string = 'de'

console.log(appTranslaions[languageCode])

console.log(appTranslaions["es"])

console.log(`\nOptional examples\n------------------------------------------------------------------`)

console.log(appOptionalTranslations["zh"] || appOptionalTranslations["default"])

console.log(optionalSomething["zh"] || optionalSomething["default"])
type DeepMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property] extends object
            ? DeepMutable<Type[Property]> 
            : DeepMutable<Type[Property]>
}


type PickByValue<Type, ValueType> = {
    [Key in keyof Type]: Type[Key] extends ValueType ? Key : never
}[keyof Type]

type OmitByValue<Type, ValueType> = {
    [Key in keyof Type]: Type[Key] extends ValueType ? never : Key
}[keyof Type]


type CustomReturnType<Type> = Type extends (param: (infer U)[]) => void ? U : undefined

type ExtendedCustomReturnType<Type> = Type extends (...args: infer ParameterType) => infer ReturnType ? [ReturnType, ParameterType] : undefined



interface Personn {
    name: string;
    age: number;
    address: {
        city: string;
        country: string;
    };
    isActive: boolean;
}


type StringKeys = PickByValue<Personn, string>


type OmitStringKeys = OmitByValue<Personn, object>
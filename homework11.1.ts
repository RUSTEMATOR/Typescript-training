type DeepMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property]
}

type TValueType = 'string' | 'boolean' | 'number' | 'bigint' | 'symbol' | 'undefined' | 'object' | 'function' | 'never'

type PickByValue<Type, ValueType> = {
    [Key in keyof Type]: Type[Key] extends ValueType ? Key : never
}

type TPickByValue<ValueType extends TValueType> = 
    ValueType extends 'string' ? string :
    ValueType extends 'boolean' ? boolean :
    ValueType extends 'number' | 'bigint' ? number :
    ValueType extends'symbol'? symbol :
    ValueType extends 'undefined'? undefined :
    ValueType extends 'object'? object : 
    ValueType extends 'function'? Function : never


type OmitByValue<Type, ValueType> = {
    [Key in keyof Type]: Type[Key] extends ValueType ? never : Key
}


type CustomReturnType<Type> = Type extends (param: (infer U)[]) => void ? U : undefined

type ExtendedCustomReturnType<Type> = Type extends (...args: infer ParameterType) => infer ReturnType ? [ReturnType, ParameterType] : undefined
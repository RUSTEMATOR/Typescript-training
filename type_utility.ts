


interface ICar {
    id: string;
    name: string;
    price: number;
    yearBuilt: number
}


interface ICarCreate extends Omit<ICar, 'id'>{}
interface ICarId extends Pick<ICar, 'id'>{}
interface IOptionalCar extends Partial<ICar>{}
interface IReadOnlyCar extends Readonly<ICar>{}
type TypeCarRecord = Record<"name" | 'price', string | number>
interface IRequired extends Required<ICar>{}

const car: ICarCreate = {
    name: 'Tesla',
    price: 123123,
    yearBuilt: 2021,
}

const caro: IOptionalCar = {}


type TypeGetName = () => string

type Retur = ReturnType<TypeGetName>


type Any = Extract<'max' | 'andrey', 'andrey' | 'misha'>

type What = Exclude<'max' | 'andrey', 'andrey' | 'misha'>

type NotNull = NonNullable<string | number | null | undefined>
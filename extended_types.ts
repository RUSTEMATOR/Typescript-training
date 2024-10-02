


type TypeIsNumber<T> = T extends number ? 'yes' : 'no';


type Type1 = TypeIsNumber<number>
type Type2 = TypeIsNumber<string>

//union types

type TypeBrand ='bmw' | 'mclaren' | 'mcs' 

type TypePrice = '$10000' | '$1000000' | '$100000000'

type TypeCar = `${TypeBrand} ${TypePrice}`

const car1: TypeCar = ''

type TypeChannelReturn = {
    name: string
}


function getChannel(name: string): TypeChannelReturn {
    return {name: "Zalupa"}
}

type TypeChannelFunction = (name: string) => TypeChannelReturn

const getChannelName: TypeChannelFunction = (name) => {
    return {name}
}


const getNumbers = (...numbers: number[]) => {
    return numbers
}

function getCar(name: string): string

function getCar(name: string, price: number): string

function getCar(name: string, price?: number): string {
    return price ? `Name ${name}, Price ${price}` : `Car Name ${name}`
}
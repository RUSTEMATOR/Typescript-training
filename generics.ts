

function entity<T>(args: T): T{
    return args
}

const entity2 = <T>(args: T):T => {
    return args
}

entity<number>("zalupa")
entity<number>(1)
entity<string>('zalupa')


class Channel<T>{

    private name: T

    constructor(name: T){
        this.name = name
    }


    getName(): T{
        return this.name
    }
}


new Channel<string>('RED Group')


interface IPair<K, V> {}
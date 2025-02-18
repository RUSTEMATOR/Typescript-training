export type Status = 'active' | 'cancelled' | 'completed' | 'waiting' | 'in-progress'

export type Type = 'default' | 'protected'

export interface IToDo {
    id: number
    name: string
    content: string
    creationDate: string
    updateDate: string
    status: Status
    type: Type
}

export interface IToDoBuilder {

    // setId(array: Array<Object>): this;
    setName(name: string): this;
    setContent(content: string): this;
    setCreationDate(date: Date): this;
    setUpdateDate(date: Date): this;
    setStatus(status: Status): this;
    setType(type: Type): this;
    build(): IToDo;
}

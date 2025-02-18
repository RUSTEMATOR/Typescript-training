import { IToDo } from "../builderInterface/builderInterface";

export interface IDestroyParams {
    id?: number
    name?: string
}

export interface ICreateDestroyController {
    create(toDo: IToDo): void
    destroy(params: IDestroyParams): void
}
import { IToDo } from "../builderInterface/builderInterface"

export interface ISearchController {
    findByName(name: string): IToDo | undefined
    findById(id: string): IToDo | undefined
    findByContent(content: string): IToDo | undefined


    sortByStatus(): Array<IToDo>
    sortByDate(): Array<IToDo>


    getTotalNumberOfToDos(): number
    getTotalNumberOfNotCompletedToDos(): number
}
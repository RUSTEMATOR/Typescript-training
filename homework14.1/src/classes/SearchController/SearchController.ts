import { IToDo } from "../../interfaces/builderInterface/builderInterface"
import { ISearchController } from "../../interfaces/searchControllerInterface/searchControllerInterface"
import BaseController from "../BaseClasses/BaseClass"

export default class SearchController extends BaseController implements ISearchController {
    findById(id: string): IToDo | undefined {
        const todos = this.readToDos()
        const todo = todos.find(todo => todo.id === parseInt(id))

        if (todo){
            console.log(`Found ToDo by ID ${id}:`, todo)
        } else {
            console.log(`ToDo with ID ${id} not found`)
        }
        return todo
    }

    findByName(name: string): IToDo | undefined {
        const todos = this.readToDos()
        const filteredTodos = todos.find(todo => todo.name
            .toLowerCase()
            .includes(name.toLowerCase()))

            if (filteredTodos) {
                console.log(`Found ToDos by name "${name}":`, filteredTodos);
            } else if (filteredTodos == undefined) {
                console.log(`No ToDos found with name "${name}".`);
            }
            return filteredTodos;
    }

    findByContent(content: string): IToDo | undefined {
        
        const todos = this.readToDos()
        const filteredTodos = todos.find(todo => todo.content
           .toLowerCase()
           .includes(content.toLowerCase()))
            if (filteredTodos) {
                console.log(`Found ToDos by content "${content}":`, filteredTodos);
            } else if (filteredTodos == undefined) {
                console.log(`No ToDos found with content "${content}".`);
            }

            return filteredTodos;
    }

    sortByDate(): Array<IToDo> {
        const todos = this.readToDos()
        const sortedByDate = todos.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime())
        console.log(`ToDos sorted by date:`, sortedByDate)
        return sortedByDate
    }

    sortByStatus(): Array<IToDo> {
        const todos = this.readToDos()
        const sortedTodos = todos.sort((a, b) => a.status.localeCompare(b.status))
        console.log('ToDos sorted by status:', sortedTodos);
        return sortedTodos;
    }


    getTotalNumberOfToDos(): number {
        
        const todos = this.readToDos()
        return todos.length;
    }

    getTotalNumberOfNotCompletedToDos(): number {
        const todos = this.readToDos()
        return todos.filter(todo => todo.status!== 'completed').length;
    }
}
import { IToDo } from "../../interfaces/builderInterface/builderInterface";
import { ICreateDestroyController, IDestroyParams } from "../../interfaces/createDestroyControllerInterface /createDestroyControllerInterface";
import { checkIfProtected } from "../../decorators/checkIfProtected";
import BaseController from "../BaseClasses/BaseClass";
import inquirer from "inquirer";



export default class CreateDestroyController extends BaseController implements ICreateDestroyController {
    create(toDo: IToDo): void {
        const todos = this.readToDos();

        const maxId = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0);
        toDo.id = maxId + 1;
    

        todos.push(toDo);

        this.writeToDos(todos);
    }

    @checkIfProtected
    async destroy(params: IDestroyParams): Promise<void> {
        let todos = this.readToDos();

        if (params.id !== undefined) { 
            const parsedId = Number(params.id);
            const todoExists = todos.some(todo => todo.id === parsedId);

            if (!todoExists) {
                console.log(`ToDo with id ${parsedId} does not exist.`);
                return;
            }

            todos = todos.filter(todo => todo.id !== parsedId);
            console.log(`Filtered todos by id: ${JSON.stringify(todos)}`);
        } else if (params.name !== undefined) {
            const todoExists = todos.some(todo => todo.name === params.name);

            if (!todoExists) {
                console.log(`ToDo with name "${params.name}" does not exist.`);
                return;
            }

            todos = todos.filter(todo => todo.name !== params.name);
        } else {
            console.log('No valid id or name provided.');
            return; 
        }

        this.writeToDos(todos);
    }

}

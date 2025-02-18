import { IToDo, Status } from "../../interfaces/builderInterface/builderInterface";
import { IInfoController } from "../../interfaces/infoControllerInterface/infoControllerInterface";
import { checkIfProtected } from "../../decorators/checkIfProtected";
import BaseController from "../BaseClasses/BaseClass";
import inquirer from "inquirer";
import moment from "moment";


export default class InfoController extends BaseController implements IInfoController {
    checkIfExists(index: number): void {
        if (Number(index) === -1) {
            throw new Error('ToDo item not found');
        }
    }

    async checkIfProtected(todo: IToDo): Promise<boolean> {
        if (todo && todo.type === 'protected') {
            const answer = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: 'This ToDo is protected. Are you sure you want to perform this action?',
                }
            ]);

            if (!answer.confirm) {
                console.log('Action cancelled.');
                return true;
            }
        }
        return false;
    }

    async changeContent(id: number, content: string): Promise<void> {
        const todos = this.readToDos()
        const todoIndex = todos.findIndex(todo => todo.id === id);

        this.checkIfExists(todoIndex);
        const isProtected = await this.checkIfProtected(todos[todoIndex]);
        if (isProtected) {
            return;
        }

        todos[todoIndex].content = content;
        todos[todoIndex].updateDate = moment().format();
        this.writeToDos(todos);
    }


    async changeName(id: number, name: string): Promise<void> {
        const todos = this.readToDos() 
        const todoIndex = todos.findIndex(todo => todo.id === id);

        this.checkIfExists(todoIndex);
        const isProtected = await this.checkIfProtected(todos[todoIndex]);
        if (isProtected) {
            return;
        }

        todos[todoIndex].name = name;
        todos[todoIndex].updateDate = moment().format();
        this.writeToDos(todos);
    }

    
    async changeStatus(id: number , status: Status): Promise<void> {
        let todos = this.readToDos()
        const todoIndex = todos.findIndex(todo => todo.id === id);
        
        this.checkIfExists(todoIndex);
        const isProtected = await this.checkIfProtected(todos[todoIndex]);
        if (isProtected) {
            return;
        }
    
        todos[todoIndex].status = status;
        todos[todoIndex].updateDate = moment().format();
        this.writeToDos(todos);
    }      
}


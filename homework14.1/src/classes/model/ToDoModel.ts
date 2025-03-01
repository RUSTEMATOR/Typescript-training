import { checkIfProtected } from '../../decorators/checkIfProtected';
import { FILE_PATH } from '../../data/constants';
import { IToDo, Status, Type } from '../../interfaces/toDoInterface/toDoInterface';
import { IDestroyParams } from '../../interfaces/destroyParametersInterface/destroyParametersInterface';

import inquirer from 'inquirer';
import moment from 'moment';
import fs from 'fs';

interface IToDoBuilder {
    // setId(array: Array<Object>): this;
    setName(name: string): this;
    setContent(content: string): this;
    setCreationDate(date: Date): this;
    setUpdateDate(date: Date): this;
    setStatus(status: Status): this;
    setType(type: Type): this;
    build(): IToDo;
}



export class ToDoModel {

    toDo: IToDo = {
        id: 0,
        name: '',
        content: '',
        creationDate: '',
        updateDate: '',
        status: 'waiting',
        type: 'default'
    }

//________________________________________________________________________________________
    private readToDos(): Array<IToDo> {
        if (!fs.existsSync(FILE_PATH)){
            fs.writeFileSync(FILE_PATH, JSON.stringify([]), 'utf8');
        }

        const data = fs.readFileSync(FILE_PATH, "utf8")
        return JSON.parse(data) as Array<IToDo>
    }

    private writeToDos(todos: Array<IToDo>): void {
        fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8')
    }
//________________________________________________________________________________________

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
//________________________________________________________________________________________

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
//________________________________________________________________________________________

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



    //________________________________________________________________________________________


    setName(name: string): this {
        this.toDo.name = name

        return this
    }

    setContent(content: string): this {
        this.toDo.content = content

        return this
    }

    setCreationDate(): this {
        this.toDo.creationDate = moment().format('YYYY-MM-DD HH:mm:ss');
        return this;

    }


    setUpdateDate(): this {
        this.toDo.creationDate = moment().format()

        return this
    }

    setStatus(status: Status): this {
        this.toDo.status = status

        return this
    }

    setType(type: Type): this {
        this.toDo.type = type

        return this
    }


    build(): IToDo {
        return this.toDo as IToDo
    }

//________________________________________________________________________________________


}

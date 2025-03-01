import { ToDoModel } from "../model/ToDoModel";
import { IToDo, Status, Type } from "../../interfaces/toDoInterface/toDoInterface";
import { IDestroyParams } from "../../interfaces/destroyParametersInterface/destroyParametersInterface";



export class ToDoController {
    private model = new ToDoModel();


    async create(toDo: IToDo): Promise<void> {
        this.model.create(toDo);
    }

    async destroy(params: IDestroyParams): Promise<void> {
        this.model.destroy(params);
    }

    async findById(id: string): Promise<IToDo | undefined> {
        return this.model.findById(id);
    }

    async findByName(name: string): Promise<IToDo | undefined> {
        return this.model.findByName(name);
    }

    async findByContent(content: string): Promise<IToDo | undefined> {
        return this.model.findByContent(content);
    }

    async sortByDate(): Promise<Array<IToDo>> {
        return this.model.sortByDate();
    }

    async sortByStatus(): Promise<Array<IToDo>> {
        return this.model.sortByStatus();
    }

    async getTotalNumberOfToDos(): Promise<number> {
        return this.model.getTotalNumberOfToDos();
    }

    async getTotalNumberOfNotCompletedToDos(): Promise<number> {
        return this.model.getTotalNumberOfNotCompletedToDos();
    }

    async checkIfExists(index: number): Promise<void> {
        this.model.checkIfExists(index);
    }

    async checkIfProtected(todo: IToDo): Promise<boolean> {

        return await this.model.checkIfProtected(todo);
    }

    changeContent(id: number, content: string): Promise<void> {
        
        return this.model.changeContent(id, content);
    }

    changeName(id: number, name: string): Promise<void> {
        console.log('Name updated')
        return this.model.changeName(id, name);
    }

    changeStatus(id: number, status: Status): Promise<void> {
        console.log('Status updated')
        return this.model.changeStatus(id, status);
    }

    setName(name: string): this {
        this.model.setName(name);
        return this;
    }

    setContent(content: string): this {
        this.model.setContent(content);
        return this;
    }

    setCreationDate(): this {
        this.model.setCreationDate();
        return this;
    }

    setUpdateDate(): this {
        this.model.setUpdateDate();
        return this;
    }

    setStatus(status: Status): this {
        this.model.setStatus(status);
        return this;
    }

    setType(type: Type): this {
        this.model.setType(type);
        return this;
    }
}


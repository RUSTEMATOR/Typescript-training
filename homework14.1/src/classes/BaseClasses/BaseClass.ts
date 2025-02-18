import { IToDo } from "../../interfaces/builderInterface/builderInterface";
import fs from 'fs'
import { FILE_PATH } from "../../data/constants";
import inquirer from "inquirer";

export default class BaseController {
    
    constructor() {}

    public readToDos(): Array<IToDo> {
        if (!fs.existsSync(FILE_PATH)){
            fs.writeFileSync(FILE_PATH, JSON.stringify([]), 'utf8');
        }

        const data = fs.readFileSync(FILE_PATH, "utf8")
        return JSON.parse(data) as Array<IToDo>
    }

    public writeToDos(todos: Array<IToDo>): void {
        fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8')
    }
}


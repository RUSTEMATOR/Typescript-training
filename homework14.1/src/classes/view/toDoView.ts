import { IToDo, Status, Type } from "../../interfaces/toDoInterface/toDoInterface";
import inquirer from "inquirer"

export class ToDoView {

    async promptAction() {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Add ToDo', 'Delete ToDo', 'Search or sort', 'Change info', 'Exit'],
            }
        ])
        return answers.action
    }

    async promptToDo(): Promise<IToDo> {
        const answers = await inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter ToDo name:' },
            { type: 'input', name: 'content', message: 'Enter content:' },
            { type: 'list', name: 'status', message: 'Choose status:', choices: ['active', 'cancelled', 'complete', 'waiting', 'in-progress'] },
            { type: 'list', name: 'type', message: 'Choose type:', choices: ['default', 'protected'] },
        ]);
        return { id: 0, name: answers.name, content: answers.content, creationDate: '', updateDate: '', status: 'active', type: 'default' };
    }

    async promptId(): Promise<number> {
        const answers = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'Enter ToDo ID:' },
        ])
        return parseInt(answers.id);
    }

    async promptSortSearch(): Promise<string> {
        const answers = await inquirer.prompt([
            { type: 'list', name:'SortOrSearch', message: 'Choose sort or search method:', choices: ['Get All', 'Get Uncompleted','Sort by Date', 'Sort by Status']},
        ])
        return answers.SortOrSearch;
    }

    async promptChangeInfo(): Promise<string> {
        const answers = await inquirer.prompt([
            { type: 'list', name:'options', message: 'Choose change method:', choices: ['change status', 'change name', 'change content']},
        ])
        return answers.options;
    }

    async promptName(): Promise<string> {
        const answers = await inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter ToDo name:' },
        ])
        return answers.name;
    }

    async promptContent(): Promise<string> {
        const answers = await inquirer.prompt([
            { type: 'input', name: 'content', message: 'Enter content:' },
        ])
        return answers.content;
    }

    async promptStatus(): Promise<Status> {
        const answers = await inquirer.prompt([
            { type: 'list', name: 'status', message: 'Choose status:', choices: ['active', 'cancelled', 'complete', 'waiting', 'in-progress'] },
        ])
        return answers.status;
    }

}

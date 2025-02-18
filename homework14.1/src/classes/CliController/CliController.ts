import { ICliControllerInterface } from "../../interfaces/cliControllerInterface/cliControllerInterface";
import inquirer from "inquirer";
import CreateDestroyController from "../CreateDestroyController/CreateDestroyController";
import ToDoBuilder from "../ToDoBuilder/ToDoBuilder";
import { IToDo } from "../../interfaces/builderInterface/builderInterface";
import SearchController from "../SearchController/SearchController";
import InfoController from "../InfoController/InfoController";
import BaseController from "../BaseClasses/BaseClass";



export default class CliController extends BaseController implements ICliControllerInterface {
    private createDestroyControllet: CreateDestroyController;
    private toDoBuilder: ToDoBuilder;
    private searchController: SearchController;
    private infoController: InfoController;

    constructor(filePath: string) {
        super()
        this.createDestroyControllet = new CreateDestroyController()
        this.toDoBuilder = new ToDoBuilder();
        this.searchController = new SearchController()
        this.infoController = new InfoController()
    }

    async start(): Promise<void> {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Add ToDo', 'Delete ToDo', 'Search or sort', 'Get All', 'Get Uncompleted',
                'Change info', 'Exit'],
            }
        ])

        if (answers.action === 'Add ToDo') {
            await this.addToDo()
        } else if (answers.action === 'Delete ToDo') {
            await this.deleteToDo()
        } else if (answers.action === 'Search or sort') {
            await this.searchOrSort()
            } else if (answers.action === 'Get All') {
                this.getTotal()
            } else if (answers.action === 'Get Uncompleted') {
                this.getUncompleted()
            } else if (answers.action === 'Change info') {
                await this.changeInfo()
        } else {
            console.log('Goodbye!')
            process.exit(0)
        }
}

    async addToDo(): Promise<void> {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the ToDo:',
                validate: (input: string) => {
                    if (input.trim() === '') {
                        return 'Please enter a valid name';
                    }
                    return true;
                },
            },

            {
                type: 'input',
                name: 'content',
                message: 'Enter the content of the ToDo:',
                validate: (input: string) => {
                    if (input.trim() === '') {
                        return 'Please enter a valid content';
                    }
                    return true;
                },
            },

            {
                type: 'list',
                name: 'status',
                message: 'Choose the status of the ToDo:',
                choices: ['active', 'cancelled', 'complete', 'waiting', 'in-progress'],
            },

            {
                type: 'list',
                name: 'type',
                message: 'Choose the type of the ToDo:',
                choices: ['default', 'protected'],
            },
        ])

        const toDo: IToDo = this.toDoBuilder
        .setName(answer.name)
        .setContent(answer.content)
        .setStatus(answer.status)
        .setType(answer.type)
        .setCreationDate()
        .build()

        this.createDestroyControllet.create(toDo)
        console.log('ToDo added successfully!')

        this.start()
    }

    async deleteToDo(): Promise<void> {
        const answer = await inquirer.prompt([
            {
                'type': 'list',
                name: 'option',
                message: 'Choose the way to delete ToDo:',
                choices: ['by ID', 'by name'],
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the ToDo to delete:',
                when: (answers) => answers.option === 'by ID',
                validate: (input: string) => {
                    const id = parseInt(input);
                    if (isNaN(id) || id <= 0) {
                        return 'Please enter a valid ID';
                    }
                    return true;
                },
            },

            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the ToDo to delete:',
                when: (answers) => answers.option === 'by name',
                validate: (input: string) => {
                    if (input.trim() === '') {
                        return 'Please enter a valid name';
                    }
                    return true;
                },
            }
        ])

        if (answer.option === 'by ID'){
            await this.createDestroyControllet.destroy({id: parseInt(answer.id)})
        } else if (answer.option === 'by name') {
            await this.createDestroyControllet.destroy({name: answer.name})
        } 

        this.start()
    }

    async searchOrSort(): Promise<void> {
        const answer = await inquirer.prompt([
            {
                'type': 'list',
                name: 'options',
                message: 'Would you like to search or to sort?',
                choices: ['search', 'sort'],
            }
        ])
        if (answer.options ==='search') {
            await this.search()
        } else if (answer.options ==='sort') {
            await this.sort()
        }
    }

    async search(): Promise<void> {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'Choose a search method', 
                choices: ['by ID', 'by name', 'by content'],
            },

            {
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the ToDo to search:',
                when: (answers) => answers.options === 'by ID',
                validate: (input: string) => {
                    const id = parseInt(input);
                    if (isNaN(id) || id <= 0) {
                        return 'Please enter a valid ID';
                    }
                    return true;
                },
            },

            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the ToDo to search:',
                when: (answers) => answers.options === 'by name',
                validate: (input: string) => {
                    if (input.trim() === '') {
                        return 'Please enter a valid name';
                    }
                    return true;
                }
            },

            {
                type: 'input',
                name: 'content',
                message: 'Enter the content of the ToDo to search:',
                when: (answers) => answers.options === 'by content',
                validate: (input: string) => {
                    if (input.trim() === '') {
                        return 'Please enter a valid content';
                    }
                    return true;
                }
            }
        ])
        if(answer.options === 'by ID') {
            this.searchController.findById(answer.id)
        } 
        else if(answer.options === 'by name') {
            this.searchController.findByName(answer.name)
        }
        else if(answer.options === 'by content') {
            this.searchController.findByContent(answer.content)
        }

        this.start()
    }

    async sort(): Promise<void>{
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'Choose a sort method', 
                choices: ['by date', 'by status'],
            }
        ])
        if(answer.options === 'by date') {
            this.searchController.sortByDate()
        } 
        else if(answer.options === 'by status') {
            this.searchController.sortByStatus()
        }

        this.start()
    }

    getTotal(): void {
        const toDos = this.searchController.getTotalNumberOfToDos()
        console.log(`Total ToDos: ${toDos}`)

        this.start()
    }

    getUncompleted(): void {
        const notCompletedToDos = this.searchController.getTotalNumberOfNotCompletedToDos()
        console.log(`Total Uncompleted ToDos: ${notCompletedToDos}`)

        this.start()
    }

    async changeInfo(): Promise<void> {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'Choose change method',
                choices: ['change status', 'change name', 'change content'],
            },

            {
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the ToDo to change:',
                when: (answers) => answers.options === 'change status' 
                || answers.options === 'change name' 
                || answers.options === 'change content',
                validate: (input: string) => {
                    const id = parseInt(input);
                    if (isNaN(id) || id <= 0) {
                        return 'Please enter a valid ID';
                    }
                    return true;
                }
            },

            {
                type: 'input',
                name: 'name',
                message: 'Enter the new name of the ToDo:',
                when: (answers) => answers.options === 'change name',
                validate: (input: string) => {
                    if (input.trim() === '') {
                        return 'Please enter a valid name';
                    }
                    return true;
                }
            },
        
            {
                type: 'input',
                name: 'content',
                message: 'Enter the new content of the ToDo:',
                when: (answers) => answers.options === 'change content',
                validate: (input: string) => {
                    if (input.trim() === '') {
                        return 'Please enter a valid content';
                    }
                    return true;
                }
            },

            {
                type: 'list',
                name:'status',
                message: 'Choose the new status of the ToDo:',
                when: (answers) => answers.options === 'change status',
                choices: ['active', 'cancelled', 'complete', 'waiting', 'in-progress'],
            }
        ])
        if(answer.options === 'change status') {
            await this.infoController.changeStatus(parseInt(answer.id), answer.status)
        } else if(answer.options === 'change name') {
            await this.infoController.changeName(parseInt(answer.id), answer.name)
        } else if(answer.options === 'change content') {
            await this.infoController.changeContent(parseInt(answer.id), answer.content)
        }
    }

}

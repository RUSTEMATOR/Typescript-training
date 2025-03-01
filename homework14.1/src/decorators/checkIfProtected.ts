import BaseController from "../classes/BaseClasses/BaseClass";
import { IToDo } from "../interfaces/builderInterface/builderInterface";
import inquirer from "inquirer";


export function checkIfProtected(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        if (!(this as BaseController).readToDos) {
            console.error("readToDos is not available in this context.");
            return;
        }

        const todos = (this as BaseController).readToDos() || [];
        const todo = todos.find((todo: IToDo) => todo.id === args[0]?.id || todo.name === args[0]?.name);

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
                return;
            }
        }

        return originalMethod.apply(this, args);
    };

    return descriptor;
}
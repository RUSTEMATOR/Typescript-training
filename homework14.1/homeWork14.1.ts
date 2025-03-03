import { ToDoView } from "./src/classes/view/toDoView";
import { ToDoController } from "./src/classes/controller/ToDoController";

// homeWork14.1.ts

export async function main() {
    const controller = new ToDoController();
    const view = new ToDoView();


    while (true) {
        const action = await view.promptAction();

        if (action === 'Add ToDo') {
            const toDo = await view.promptToDo();
            controller.create(toDo);
            console.log('ToDo created');

        } else if (action === 'Delete ToDo') {
            const deleteId = await view.promptId();
            controller.destroy({ id: deleteId });
            console.log('ToDo deleted');

        } else if (action === 'Search or sort') {
            const searchOrSort = await view.promptSortSearch();

            if (searchOrSort === 'Get All') {

                const total = await controller.getTotalNumberOfToDos();
                console.log('Total ToDos:', total);

            } else if (searchOrSort === 'Get Uncompleted') {
                const totalUndone = await controller.getTotalNumberOfNotCompletedToDos()
                console.log('Total Undone:', totalUndone);

            } else if (searchOrSort === 'Sort by Date') {
                await controller.sortByDate();

            } else if (searchOrSort === 'Sort by Status') {
                await controller.sortByStatus();

            } else {
                console.log('Invalid option');
            }
        } else if (action === 'Change info') {
            const changeId = await view.promptId();
            const field = await view.promptChangeInfo();

            if (field === 'change name') {
                const newName = await view.promptName();
                await controller.changeName(changeId, newName);
                console.log('Name updated');

            } else if (field === 'change status') {
                const newStatus = await view.promptStatus();
                await controller.changeStatus(changeId, newStatus);
                console.log('Status updated');

            } else if (field === 'change content') {
                const newContent = await view.promptContent();
                await controller.changeContent(changeId, newContent);
                console.log('Content updated');

            } else {
                console.log('Invalid field');
            }
        } else if (action === 'Exit') {
            console.log('Exiting...');
            process.exit(0);
            
        } else {
            console.log('Invalid action');
        }
    }
}

main();


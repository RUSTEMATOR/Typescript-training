import { ToDoView } from "./src/classes/view/toDoView";
import { ToDoController } from "./src/classes/controller/ToDoController";
import { main } from './homeWork14.1';
import moment from "moment";

jest.mock('./src/classes/view/toDoView');
jest.mock('./src/classes/controller/ToDoController');

describe('main function', () => {
    let viewMock: jest.Mocked<ToDoView>;
    let controllerMock: jest.Mocked<ToDoController>;

    beforeEach(() => {
        viewMock = new ToDoView() as jest.Mocked<ToDoView>;
        controllerMock = new ToDoController() as jest.Mocked<ToDoController>;

        (ToDoView as jest.Mock).mockImplementation(() => viewMock);
        (ToDoController as jest.Mock).mockImplementation(() => controllerMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a ToDo', async () => {
        viewMock.promptAction.mockResolvedValueOnce('Add ToDo');
        viewMock.promptToDo.mockResolvedValueOnce({ id: 1, name: 'Test ToDo', content: 'Test Content', type: 
    'default', status: 'waiting', creationDate: moment().format(), updateDate: moment().format()});

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const mainPromise = main();
        await new Promise(process.nextTick); // Allow the main loop to run once
        expect(controllerMock.create).toHaveBeenCalledWith({ id: 1, name: 'Test ToDo', content: 'Test Content', status: 'pending' });
        expect(logSpy).toHaveBeenCalledWith('ToDo created');

        logSpy.mockRestore();
        process.exit = jest.fn() as any; // Prevent the process from exiting
        await mainPromise;
    });

    test('should delete a ToDo', async () => {
        viewMock.promptAction.mockResolvedValueOnce('Delete ToDo');
        viewMock.promptId.mockResolvedValueOnce(1);

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const mainPromise = main();
        await new Promise(process.nextTick); // Allow the main loop to run once
        expect(controllerMock.destroy).toHaveBeenCalledWith({ id: 1 });
        expect(logSpy).toHaveBeenCalledWith('ToDo deleted');

        logSpy.mockRestore();
        process.exit = jest.fn() as any; // Prevent the process from exiting
        await mainPromise;
    });

    test('should get total number of ToDos', async () => {
        viewMock.promptAction.mockResolvedValueOnce('Search or sort');
        viewMock.promptSortSearch.mockResolvedValueOnce('Get All');
        controllerMock.getTotalNumberOfToDos.mockResolvedValueOnce(5);

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const mainPromise = main();
        await new Promise(process.nextTick); // Allow the main loop to run once
        expect(controllerMock.getTotalNumberOfToDos).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Total ToDos:', 5);

        logSpy.mockRestore();
        process.exit = jest.fn() as any; // Prevent the process from exiting
        await mainPromise;
    });

    test('should exit the application', async () => {
        viewMock.promptAction.mockResolvedValueOnce('Exit');

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        

        const mainPromise = main();
        await new Promise(process.nextTick); // Allow the main loop to run once
        expect(logSpy).toHaveBeenCalledWith('Exiting...');
        

        logSpy.mockRestore();
        await mainPromise;
    });
});
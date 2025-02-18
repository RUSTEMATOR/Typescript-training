import CliController from "./src/classes/CliController/CliController";
import ToDoBuilder from "./src/classes/ToDoBuilder/ToDoBuilder";
import { FILE_PATH } from "./src/data/constants";


const cli = new CliController(FILE_PATH)


cli.start()

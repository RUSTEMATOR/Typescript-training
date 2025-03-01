import moment from 'moment'
import { IToDoBuilder, IToDo, Status, Type } from "../../interfaces/builderInterface/builderInterface";
import { FILE_PATH } from '../../data/constants';


export default class ToDoBuilder implements IToDoBuilder {
    private toDo: IToDo = {
        id: 0,
        name: '',
        content: '',
        creationDate: '',
        updateDate: '',
        status: 'waiting',
        type: 'default'
    }

    // setId(): this {
    //     const maxId = FILE_PATH.length
    //     this.toDo.id = maxId + 1

    //     return this
    // }

    
}
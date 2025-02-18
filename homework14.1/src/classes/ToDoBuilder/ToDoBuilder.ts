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
}
import { Status } from "../builderInterface/builderInterface";

export interface IInfoController {
    
    
    changeStatus(id: number, status: Status): void;
    changeContent(id: number, content: string): void;
    changeName(id: number, name: string): void;
}
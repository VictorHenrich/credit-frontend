import UserEntity from "./User";
import { ModelEntity } from "./common";



export default interface EmployeeEntity extends UserEntity, ModelEntity{
    name: string;
    salary: number;
    score: number;
    documentCPF: string;
}
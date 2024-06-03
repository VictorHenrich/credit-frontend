import UserEntity from "./User";



export default interface EmployeeEntity extends UserEntity{
    name: string;
    salary: number;
    score: number;
    documentCPF: string;
}
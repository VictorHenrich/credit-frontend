import { ModelEntity } from "./common";




export default interface LoanEntity extends ModelEntity{
    description: string;
    minScore: number;
    minSalary: number;
    maxInstallments: number;
}
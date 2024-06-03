import { ModelEntity } from "./common";




export interface LoanEntity extends ModelEntity{
    description: string;
    minScore: number;
    minSalary: number;
    maxInstallments: number;
}
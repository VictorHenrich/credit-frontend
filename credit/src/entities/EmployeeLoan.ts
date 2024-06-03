import EmployeeEntity from "./Employee";
import LoanEntity from "./Loan";
import { ModelEntity } from "./common";



export default interface EmployeeLoanEntity extends ModelEntity{
    employee: EmployeeEntity,
    loan: LoanEntity,
    created: Date,
    value: number
}
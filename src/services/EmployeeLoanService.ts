import api from "../utils/api";
import EmployeeLoanEntity from "../entities/EmployeeLoan";
import LoanEntity from "../entities/Loan";




export default class EmployeeLoanService{
    static async createEmployeeLoan({loan, ...employeeLoan}: Pick<EmployeeLoanEntity, "value" | "loan">){
        const url: string = `${import.meta.env.VITE_EMPLOYEE_LOAN_CREATION_URL}/${loan.uuid}`;

        await api.post(url, employeeLoan);
    }

    static async findEmployeeLoansReleased(): Promise<LoanEntity[]>{
        const {data: { data: loans }} = await api.get(import.meta.env.VITE_EMPLOYEE_LOAN_LIST_RELEASED_URL);

        return loans;
    }

    static async findEmployeeLoanMany(): Promise<EmployeeLoanEntity[]>{
        const {data: { data: loans }} = await api.get(import.meta.env.VITE_EMPLOYEE_LOAN_LIST_ALL_URL);

        return loans;
    }
}
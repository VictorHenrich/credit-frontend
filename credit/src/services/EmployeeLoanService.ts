import api from "../utils/api";
import EmployeeLoanEntity from "../entities/EmployeeLoan";




export default class EmployeeLoanService{
    async createEmployeeLoan(employeeLoan: Pick<EmployeeLoanEntity, "value">){
        await api.post(import.meta.env.VITE_EMPLOYEE_LOAN_CREATION_URL, employeeLoan);
    }

    async findEmployeeLoans(): Promise<EmployeeLoanEntity[]>{
        return await api.get(import.meta.env.VITE_EMPLOYEE_LOAN_LISTING_URL);
    }
}
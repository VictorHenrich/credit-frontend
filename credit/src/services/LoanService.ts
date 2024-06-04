import api from "../utils/api";
import LoanEntity from "../entities/Loan";



export default class LoanService{
    static async findLoans(): Promise<LoanEntity[]>{
        const { data: { data: loans }} = await api.get(import.meta.env.VITE_LOAN_LISTING_URL);

        return loans;
    }

    static async createLoan(loan: Omit<LoanEntity, "uuid">){
        await api.post(import.meta.env.VITE_LOAN_CREATION_URL, loan);
    }

    static async updateLoan(loan: LoanEntity){
        await api.put(import.meta.env.VITE_LOAN_UPDATE_URL, loan)
    }

    static async deleteLoan(loan: LoanEntity){
        const url: string = `${import.meta.env.VITE_LOAN_LISTING_URL}/${loan.uuid}`;

        await api.delete(url);
    }
}
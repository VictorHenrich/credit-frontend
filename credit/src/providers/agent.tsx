import React from "react";
import LoanEntity from "../entities/Loan";
import EmployeeEntity from "../entities/Employee";
import EmployeeService from "../services/EmployeeService";
import LoanService from "../services/LoanService";




export interface AgentContextProps{
    employees: EmployeeEntity[],
    loans: LoanEntity[],
    loadEmployees: () => Promise<void>,
    loadLoans: () => Promise<void>
}


const valueContext: AgentContextProps = {
    employees: [],
    loans: [],
    loadEmployees: async ()=> undefined,
    loadLoans: async ()=> undefined
}

export const AgentContext: React.Context<AgentContextProps> = React.createContext<AgentContextProps>(valueContext);


export default function AgentProvider({ children }: React.PropsWithChildren): React.ReactElement{
    const [employees, setEmployees] = React.useState<EmployeeEntity[]>(valueContext.employees);

    const [loans, setLoans] = React.useState<LoanEntity[]>(valueContext.loans);

    async function loadEmployees(): Promise<void>{
        const employees: EmployeeEntity[] = await EmployeeService.findEmplowees();

        setEmployees(employees);
    }

    async function loadLoans(): Promise<void>{
        const loans: LoanEntity[] = await LoanService.findLoans();

        setLoans(loans);
    }
    
    return (
        <AgentContext.Provider value={{
            employees,
            loans,
            loadEmployees,
            loadLoans
        }}>
            {children}
        </AgentContext.Provider>
    )
}
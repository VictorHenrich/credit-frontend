import React from "react";
import LoanEntity from "../entities/Loan";
import EmployeeEntity from "../entities/Employee";




export interface AgentContextProps{
    employees: EmployeeEntity[],
    loans: LoanEntity[],
    loadAgent: () => Promise<void>,
    loadLoans: () => Promise<void>
}


const valueContext: AgentContextProps = {
    employees: [],
    loans: [],
    loadAgent: async ()=> undefined,
    loadLoans: async ()=> undefined
}

export const AgentContext: React.Context<AgentContextProps> = React.createContext<AgentContextProps>(valueContext);


export default function AgentProvider({ children }: React.PropsWithChildren): React.ReactElement{
    const [employees, setEmployees] = React.useState<EmployeeEntity[]>(valueContext.employees);

    const [loans, setLoans] = React.useState<LoanEntity[]>(valueContext.loans);

    async function loadAgent(): Promise<void>{
        setEmployees(valueContext.employees);
    }

    async function loadLoans(): Promise<void>{
        setLoans(valueContext.loans);
    }
    
    return (
        <AgentContext.Provider value={{
            employees,
            loans,
            loadAgent,
            loadLoans
        }}>
            {children}
        </AgentContext.Provider>
    )
}
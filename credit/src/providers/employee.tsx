import React from "react";
import { LoanEntity } from "../entities/Loan";
import EmployeeEntity from "../entities/Employee";




export interface EmployeeContextProps{
    employee: EmployeeEntity,
    loans: LoanEntity[],
    loadEmployee: () => Promise<void>,
    loadLoans: () => Promise<void>
}


const valueContext: EmployeeContextProps = {
    employee: {
        documentCPF: "",
        email: "",
        name: "",
        password: "",
        salary: 0,
        score: 0,
        uuid: ""
    },
    loans: [],
    loadEmployee: async ()=> undefined,
    loadLoans: async ()=> undefined
}

const AgentContext: React.Context<EmployeeContextProps> = React.createContext<EmployeeContextProps>(valueContext);


export default function AgentProvider({ children }: React.PropsWithChildren): React.ReactElement{
    const [employee, setEmployee] = React.useState<EmployeeEntity>(valueContext.employee);

    const [loans, setLoans] = React.useState<LoanEntity[]>(valueContext.loans);

    async function loadEmployee(): Promise<void>{
        setEmployee(valueContext.employee);
    }

    async function loadLoans(): Promise<void>{
        setLoans(valueContext.loans);
    }
    
    return (
        <AgentContext.Provider value={{
            employee,
            loans,
            loadEmployee,
            loadLoans
        }}>
            {children}
        </AgentContext.Provider>
    )
}
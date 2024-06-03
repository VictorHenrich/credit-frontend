import React from "react";
import AgentEntity from "../entities/Agent";
import { LoanEntity } from "../entities/Loan";




export interface AgentContextProps{
    agent: AgentEntity,
    loans: LoanEntity[],
    loadAgent: () => Promise<void>,
    loadLoans: () => Promise<void>
}


const valueContext: AgentContextProps = {
    agent: {
        documentCPF: "",
        email: "",
        name: "",
        password: "",
        uuid: ""
    },
    loans: [],
    loadAgent: async ()=> undefined,
    loadLoans: async ()=> undefined
}

const AgentContext: React.Context<AgentContextProps> = React.createContext<AgentContextProps>(valueContext);


export default function AgentProvider({ children }: React.PropsWithChildren): React.ReactElement{
    const [agent, setAgent] = React.useState<AgentEntity>(valueContext.agent);

    const [loans, setLoans] = React.useState<LoanEntity[]>(valueContext.loans);

    async function loadAgent(): Promise<void>{
        setAgent(valueContext.agent);
    }

    async function loadLoans(): Promise<void>{
        setLoans(valueContext.loans);
    }
    
    return (
        <AgentContext.Provider value={{
            agent,
            loans,
            loadAgent,
            loadLoans
        }}>
            {children}
        </AgentContext.Provider>
    )
}
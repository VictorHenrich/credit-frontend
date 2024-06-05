import React from "react";
import EmployeeEntity from "../entities/Employee";
import EmployeeLoanEntity from "../entities/EmployeeLoan";
import EmployeeService from "../services/EmployeeService";
import EmployeeLoanService from "../services/EmployeeLoanService";




export interface EmployeeContextProps{
    employee: EmployeeEntity,
    loans: Omit<EmployeeLoanEntity, "employee">[],
    loadEmployee: () => Promise<void>,
    loadLoans: () => Promise<void>,
    setEmployee: (employee: Partial<EmployeeEntity>) => void
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
    loadLoans: async ()=> undefined,
    setEmployee: () => undefined
}

export const EmployeeContext: React.Context<EmployeeContextProps> = React.createContext<EmployeeContextProps>(valueContext);


export default function EmployeeProvider({ children }: React.PropsWithChildren): React.ReactElement{
    const [employee, setEmployee] = React.useState<EmployeeEntity>(valueContext.employee);

    const [loans, setLoans] = React.useState<Omit<EmployeeLoanEntity, "employee">[]>(valueContext.loans);

    async function loadEmployee(): Promise<void>{
        const employee: EmployeeEntity = await EmployeeService.captureAuthenticatedEmployee();

        setEmployee({...employee });
    }

    async function loadLoans(): Promise<void>{
        const loans: EmployeeLoanEntity[] = await EmployeeLoanService.findEmployeeLoanMany();

        setLoans(loans.map(item => ({...item, employee: undefined})));
    }

    function handleSetEmployee(employeeData: Partial<EmployeeEntity>): void{
        setEmployee({ ...employee, ...employeeData});
    }
    
    return (
        <EmployeeContext.Provider value={{
            employee,
            loans,
            loadEmployee,
            loadLoans,
            setEmployee: handleSetEmployee
        }}>
            {children}
        </EmployeeContext.Provider>
    )
}
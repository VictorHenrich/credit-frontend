import React from "react";
import EmployeeEntity from "../entities/Employee";
import EmployeeLoanEntity from "../entities/EmployeeLoan";
import ServiceProps from "../utils/interfaces";
import EmployeeCaptureService from "../services/EmployeeCaptureService";




export interface EmployeeContextProps{
    employee: EmployeeEntity,
    loans: Omit<EmployeeLoanEntity[], "employee">,
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

    const [loans, setLoans] = React.useState<Omit<EmployeeLoanEntity[], "employee">>(valueContext.loans);

    async function loadEmployee(): Promise<void>{
        const employeeCaptureService: ServiceProps<EmployeeEntity> = new EmployeeCaptureService();

        const employee: EmployeeEntity = await employeeCaptureService.execute();

        setEmployee({...employee });
    }

    async function loadLoans(): Promise<void>{
        setLoans(valueContext.loans);
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
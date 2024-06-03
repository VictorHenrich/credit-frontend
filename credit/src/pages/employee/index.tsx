import MenuDefault from "../../components/menu";
import { Outlet } from "react-router-dom";
import EmployeeProvider from "../../providers/employee";
import { EMPLOYEE_ITENS_MENU } from "../../utils/constantes";





export default function EmployeePage(){
    return (
        <EmployeeProvider>
            <MenuDefault
                isOpen={true}
                itens={EMPLOYEE_ITENS_MENU}
            />
            <Outlet />
        </EmployeeProvider>
    );
}
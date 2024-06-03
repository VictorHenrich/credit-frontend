import MenuDefault from "../../components/menu";
import { Outlet } from "react-router-dom";
import EmployeeProvider from "../../providers/employee";
import { EMPLOYEE_ITENS_MENU } from "../../utils/constantes";
import { Center } from "@chakra-ui/react";





export default function EmployeePage(){
    return (
        <EmployeeProvider>
            <MenuDefault
                isOpen={true}
                itens={EMPLOYEE_ITENS_MENU}
            />
            <Center 
                width="100vw" 
                height="100vh"
                backgroundColor="primary"
            >
                <Outlet />
            </Center>
        </EmployeeProvider>
    );
}
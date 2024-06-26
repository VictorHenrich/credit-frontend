import React from "react";
import MenuDefault from "../../components/menu";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import EmployeeProvider from "../../providers/employee";
import { EMPLOYEE_ITENS_MENU } from "../../utils/constantes";
import { Center } from "@chakra-ui/react";




export default function EmployeePage(){
    const navigator: NavigateFunction = useNavigate();

    React.useEffect(()=> {
        navigator(import.meta.env.VITE_EMPLOYEE_PROFILE_PATH);
    }, []);

    return (
        <EmployeeProvider>
            <MenuDefault
                isOpen={true}
                itens={EMPLOYEE_ITENS_MENU}
                initialItemSelected={EMPLOYEE_ITENS_MENU.find(item => item.path === import.meta.env.VITE_EMPLOYEE_PROFILE_PATH)}
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
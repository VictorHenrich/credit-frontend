import React from "react";
import MenuDefault, { ItemMenuProps } from "../../components/menu";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import EmployeeProvider from "../../providers/employee";
import { EMPLOYEE_ITENS_MENU } from "../../utils/constantes";
import { Center } from "@chakra-ui/react";




export default function EmployeePage(){
    const navigator: NavigateFunction = useNavigate();

    React.useEffect(()=> {
        navigator(import.meta.env.VITE_EMPLOYEE_PROFILE_PATH);
    }, []);

    const [itemSelected, setItemSelected] = React.useState<ItemMenuProps | undefined>();

    return (
        <EmployeeProvider>
            <MenuDefault
                isOpen={true}
                itens={EMPLOYEE_ITENS_MENU}
                itemSelected={itemSelected}
                onSelectItem={(item) => setItemSelected(item)}
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
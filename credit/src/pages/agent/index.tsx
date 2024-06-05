import React from "react";
import MenuDefault, { ItemMenuProps } from "../../components/menu";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import AgentProvider from "../../providers/agent";
import { AGENT_ITENS_MENU } from "../../utils/constantes";
import { Center } from "@chakra-ui/react";




export default function AgentPage(){
    const navigator: NavigateFunction = useNavigate();

    React.useEffect(()=> {
        navigator(import.meta.env.VITE_AGENT_EMPLOYEES_PATH);
    }, []);

    const [itemSelected, setItemSelected] = React.useState<ItemMenuProps | undefined>();

    return (
        <AgentProvider>
            <MenuDefault
                isOpen={true}
                itens={AGENT_ITENS_MENU}
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
        </AgentProvider>
    );
}
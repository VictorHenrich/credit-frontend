import MenuDefault from "../../components/menu";
import { Outlet } from "react-router-dom";
import AgentProvider from "../../providers/agent";
import { AGENT_ITENS_MENU } from "../../utils/constantes";
import { Center } from "@chakra-ui/react";



export default function AgentPage(){
    return (
        <AgentProvider>
            <MenuDefault
                isOpen={true}
                itens={AGENT_ITENS_MENU}
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
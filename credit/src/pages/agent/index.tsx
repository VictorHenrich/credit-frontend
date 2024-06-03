import { Outlet } from "react-router-dom";
import AgentProvider from "../../providers/agent";
import MenuDefault from "../../components/menu";
import { AGENT_ITENS_MENU } from "../../utils/constantes";






export default function AgentPage(){
    return (
        <AgentProvider>
            <MenuDefault
                isOpen={true}
                itens={AGENT_ITENS_MENU}
            />
            <Outlet />
        </AgentProvider>
    );
}
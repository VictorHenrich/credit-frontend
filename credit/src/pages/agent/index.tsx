import MenuDefault, {ItemMenuProps} from "../../components/menu";
import { FaUserCheck } from "react-icons/fa";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { BiSolidBank } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";





export default function AgentPage(){

    const itensMenu: ItemMenuProps[] = [
        {
            description: "Perfil",
            icon: FaUserCheck,
            id: "profile"
        },
        {
            description: "Funcionários",
            icon: BsCreditCard2FrontFill,
            id: "loan"
        },
        {
            description: "Empresas",
            icon: BiSolidBank,
            id: "bank"
        },
        {
            description: "Emprestimos",
            icon: BiSolidBank,
            id: "bank"
        },
        {
            description: "Sair",
            icon: BiLogOut,
            id: "logout"
        }
    ]

    return (
        <MenuDefault
            isOpen={true}
            itens={itensMenu}
        />
    );
}
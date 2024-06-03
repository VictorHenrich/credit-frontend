import MenuDefault, {ItemMenuProps} from "../../components/menu";
import { FaUserCheck } from "react-icons/fa";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { BiSolidBank } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { Outlet } from "react-router-dom";





export default function EmployeePage(){

    const itensMenu: ItemMenuProps[] = [
        {
            description: "Perfil",
            icon: FaUserCheck,
            id: "profile"
        },
        {
            description: "Empréstimos",
            icon: BsCreditCard2FrontFill,
            id: "loan"
        },
        {
            description: "Contas Bancárias",
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
        <>
            <MenuDefault
                isOpen={true}
                itens={itensMenu}
            />
            <Outlet />
        </>
    );
}
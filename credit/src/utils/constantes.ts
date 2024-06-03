import { FaUserCheck } from "react-icons/fa";
import { ItemMenuProps } from "../components/menu";
import { BsBuildingsFill, BsCreditCard2FrontFill } from "react-icons/bs";
import { BiLogOut, BiSolidBank } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";



export const EMPLOYEE_ITENS_MENU: ItemMenuProps[] = [
    {
        description: "Perfil",
        icon: FaUserCheck,
        id: "profile",
        path: "/employee/profile"
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


export const AGENT_ITENS_MENU: ItemMenuProps[] = [
    {
        description: "Empresa",
        icon: BsBuildingsFill,
        id: "profile"
    },
    {
        description: "Funcionários",
        icon: FaPeopleGroup,
        id: "loan"
    },
    {
        description: "Emprestimos",
        icon: BsCreditCard2FrontFill,
        id: "bank"
    },
    {
        description: "Sair",
        icon: BiLogOut,
        id: "logout"
    }
]
import { FaUserCheck } from "react-icons/fa";
import { ItemMenuProps } from "../components/menu";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { CreateAxiosDefaults } from "axios";


export const AXIOS_CONFIG: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_BASE_URL,
}


export const DEFAULT_ITENS_MENU: ItemMenuProps[] = [
    {
        description: "Sair",
        icon: BiLogOut,
        id: "logout",
        path: "/logout"
    }
]


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
        id: "loan",
        path: "/employee/loans"
    },
    ...DEFAULT_ITENS_MENU
]


export const AGENT_ITENS_MENU: ItemMenuProps[] = [
    {
        description: "Funcionários",
        icon: FaPeopleGroup,
        id: "employees",
        path: "/agent/employees"
    },
    {
        description: "Emprestimos",
        icon: BsCreditCard2FrontFill,
        id: "loans",
        path: "/agent/loans"
    },
    ...DEFAULT_ITENS_MENU
]
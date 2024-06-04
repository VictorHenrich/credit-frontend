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
        path: import.meta.env.VITE_LOGOUT_PATH
    }
]


export const EMPLOYEE_ITENS_MENU: ItemMenuProps[] = [
    {
        description: "Perfil",
        icon: FaUserCheck,
        id: "profile",
        path: import.meta.env.VITE_EMPLOYEE_PROFILE_PATH
    },
    {
        description: "Empréstimos",
        icon: BsCreditCard2FrontFill,
        id: "loan",
        path: import.meta.env.VITE_EMPLOYEE_LOANS_PATH
    },
    ...DEFAULT_ITENS_MENU
]


export const AGENT_ITENS_MENU: ItemMenuProps[] = [
    {
        description: "Funcionários",
        icon: FaPeopleGroup,
        id: "employees",
        path: import.meta.env.VITE_AGENT_EMPLOYEES_PATH
    },
    {
        description: "Emprestimos",
        icon: BsCreditCard2FrontFill,
        id: "loans",
        path: import.meta.env.VITE_AGENT_LOANS_PATH
    },
    ...DEFAULT_ITENS_MENU
]
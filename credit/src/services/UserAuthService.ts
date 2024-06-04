import UserEntity, { UserTypes } from "../entities/User";
import ServiceProps from "../utils/interfaces";
import api from "../utils/api";
import { NavigateFunction } from "react-router-dom";



export interface UserAuthServiceProps extends UserEntity{
    userType: UserTypes,
    navigator: NavigateFunction
}



export default class UserAuthService implements ServiceProps<void>{
    constructor(
        private readonly props: UserAuthServiceProps
    ){}

    private async authenticate(): Promise<void>{
        const url: string = this.props.userType === UserTypes.EMPLOYEE
            ? import.meta.env.VITE_EMPLOYEE_AUTH_URL
            : import.meta.env.VITE_AGENT_AUTH_URL

        const data: UserEntity = { ...this.props };

        const { data: { data: { refreshToken } } } = await api.post(url, data);

        localStorage.setItem(import.meta.env.VITE_TOKEN_DATA_NAME, refreshToken);
    } 

    async execute(): Promise<void>{
        await this.authenticate();

        const path: string = 
            this.props.userType == UserTypes.EMPLOYEE 
                ? import.meta.env.VITE_EMPLOYEE_PROFILE_PATH 
                : import.meta.env.VITE_AGENT_MAIN_PATH;

        this.props.navigator(path);
    }
}
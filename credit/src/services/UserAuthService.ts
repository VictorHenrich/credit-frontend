import UserEntity, { UserTypes } from "../entities/User";
import ServiceProps from "../utils/interfaces";
import api from "../utils/api";
import { NavigateFunction } from "react-router-dom";



export interface UserAuthServiceProps extends UserEntity{
    userType: UserTypes,
    navigator: NavigateFunction
}



export default class UserAuthService implements ServiceProps<void>{
    static agentAuthUrl: string = import.meta.env.VITE_AGENT_AUTH_URL;

    static employeeAuthUrl: string = import.meta.env.VITE_EMPLOYEE_AUTH_URL;

    constructor(
        private readonly props: UserAuthServiceProps
    ){}

    private async authenticate(): Promise<void>{
        const url: string = this.props.userType === UserTypes.EMPLOYEE
            ? UserAuthService.employeeAuthUrl
            : UserAuthService.agentAuthUrl

        const data: UserEntity = { ...this.props };

        const { data: { data: { refreshToken } } } = await api.post(url, data);

        localStorage.setItem(import.meta.env.VITE_TOKEN_DATA_NAME, refreshToken);
    } 

    async execute(): Promise<void>{
        await this.authenticate();

        const path: string = this.props.userType == UserTypes.EMPLOYEE ? "/employee" : "/agent";

        this.props.navigator(path);
    }
}
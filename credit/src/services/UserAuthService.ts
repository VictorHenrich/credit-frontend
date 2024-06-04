import UserEntity, { UserTypes } from "../entities/User";
import ServiceProps from "../utils/interfaces";
import api from "../utils/api";
import { NavigateFunction } from "react-router-dom";



export interface UserAuthServiceProps extends UserEntity{
    userType: UserTypes,
    navigator: NavigateFunction
}



export default class UserAuthService implements ServiceProps<void>{
    static agentAuthUrl: string = import.meta.env.AGENT_AUTH_URL;

    static employeeAuthUrl: string = import.meta.env.EMPLOYEE_AUTH_URL;

    constructor(
        private readonly props: UserAuthServiceProps
    ){}

    private async authenticate(): Promise<void>{
        const url: string = this.props.userType === UserTypes.AGENT
            ? UserAuthService.agentAuthUrl
            : UserAuthService.employeeAuthUrl

        const data: UserEntity = { ...this.props };

        const { data: token } = await api.post(url, data);

        localStorage.setItem(import.meta.env.TOKEN_DATA_NAME, token);
    } 

    async execute(): Promise<void>{
        await this.authenticate();

        const path: string = this.props.userType == UserTypes.AGENT ? "/employee" : "/agent";

        this.props.navigator(path);
    }
}
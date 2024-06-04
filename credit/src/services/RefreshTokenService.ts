import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import ServiceProps from "../utils/interfaces";



export interface RefreshTokenServiceProps{
    apiInstance: AxiosInstance,
    request: InternalAxiosRequestConfig
}


export default class RefreshTokenService implements ServiceProps<InternalAxiosRequestConfig>{
    private static refreshTokenUrl: string = import.meta.env.REFRESH_TOKEN_URL

    constructor(
        private props: RefreshTokenServiceProps
    ){}

    private async refreshToken(token: string): Promise<string>{
        const data = { token };

        const { data: newToken } = await this.props.apiInstance.post(RefreshTokenService.refreshTokenUrl, data);

        localStorage.setItem(import.meta.env.TOKEN_DATA_NAME, newToken);

        return newToken;
    }

    async execute(): Promise<InternalAxiosRequestConfig>{
        const token: string | null = localStorage.getItem(import.meta.env.TOKEN_DATA_NAME);

        if(token){
            const newToken: string = await this.refreshToken(token);

            this.props.request.headers.Authorization = newToken;
        }
            
        return this.props.request;
    }
}
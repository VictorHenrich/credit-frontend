import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import ServiceProps from "../utils/interfaces";



export interface RefreshTokenServiceProps{
    apiInstance: AxiosInstance,
    request: InternalAxiosRequestConfig
}


export default class RefreshTokenService implements ServiceProps<InternalAxiosRequestConfig>{
    constructor(
        private props: RefreshTokenServiceProps
    ){}

    private async refreshToken(token: string): Promise<string>{
        const data = { token };

        const { data: { data: { token: newToken }} } = await this.props.apiInstance.post(
            import.meta.env.VITE_REFRESH_TOKEN_URL, 
            data
        );

        return newToken;
    }

    async execute(): Promise<InternalAxiosRequestConfig>{
        const token: string | null = localStorage.getItem(import.meta.env.VITE_TOKEN_DATA_NAME);

        if(token){
            const newToken: string = await this.refreshToken(token);

            this.props.request.headers.Authorization = newToken;
        }
            
        return this.props.request;
    }
}
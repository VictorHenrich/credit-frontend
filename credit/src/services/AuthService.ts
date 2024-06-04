import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { NavigateFunction } from "react-router-dom";
import api from "../utils/api";
import UserEntity, { UserTypes } from "../entities/User";
import { AXIOS_CONFIG } from "../utils/constantes";





export default class AuthService{
    static async refreshToken(request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>{
        const apiInstance: AxiosInstance = axios.create(AXIOS_CONFIG);

        const token: string | null = localStorage.getItem(import.meta.env.VITE_TOKEN_DATA_NAME);
        

        if(token){
            const data = { token };

            const { data: { data: { token: newToken }} } = await apiInstance.post(
                import.meta.env.VITE_REFRESH_TOKEN_URL, 
                data
            );

            request.headers.Authorization = newToken;
        }
            
        return request;
    }

    static async authenticate(
        userType: UserTypes,
        navigator: NavigateFunction,
        userdata: UserEntity
    ): Promise<void>{
        const url: string = userType === UserTypes.EMPLOYEE
            ? import.meta.env.VITE_EMPLOYEE_AUTH_URL
            : import.meta.env.VITE_AGENT_AUTH_URL

        const { data: { data: { refreshToken } } } = await api.post(url, userdata);

        localStorage.setItem(import.meta.env.VITE_TOKEN_DATA_NAME, refreshToken);

        const path: string = 
            userType == UserTypes.EMPLOYEE 
                ? import.meta.env.VITE_EMPLOYEE_PROFILE_PATH 
                : import.meta.env.VITE_AGENT_MAIN_PATH;

        navigator(path);
    }

    static checkUserLogged(): boolean{
        return Boolean(localStorage.getItem(import.meta.env.VITE_TOKEN_DATA_NAME));
    }

    static logout(navigator: NavigateFunction): void{
        localStorage.removeItem(import.meta.env.VITE_TOKEN_DATA_NAME);

        navigator(import.meta.env.VITE_HOME_PATH);
    }
}
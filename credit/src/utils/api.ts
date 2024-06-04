import axios, { AxiosInstance } from "axios";
import AuthService from "../services/AuthService";
import { AXIOS_CONFIG } from "./constantes";


const api: AxiosInstance = axios.create(AXIOS_CONFIG);

api.interceptors.request.use(async (config) => {
    return AuthService.refreshToken(
        axios.create(AXIOS_CONFIG),
        config
    )
});

export default api
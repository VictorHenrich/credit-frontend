import axios, { AxiosInstance } from "axios";
import RefreshTokenService from "../services/RefreshTokenService";
import { AXIOS_CONFIG } from "./constantes";


const api: AxiosInstance = axios.create(AXIOS_CONFIG);

api.interceptors.request.use(async (config) => {
    const refreshTokenService = new RefreshTokenService({
        apiInstance: axios.create(AXIOS_CONFIG),
        request: config
    })

    return await refreshTokenService.execute();

});

export default api
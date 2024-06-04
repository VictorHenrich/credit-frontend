import axios, { AxiosInstance } from "axios";
import RefreshTokenService from "../services/RefreshTokenService";



const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});


api.interceptors.request.use(async (config) => {
    const refreshTokenService = new RefreshTokenService({
        apiInstance: api,
        request: config
    })

    return await refreshTokenService.execute()
});

export default api
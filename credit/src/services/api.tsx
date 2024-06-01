import axios, { AxiosInstance } from "axios";



const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL
});


export default api
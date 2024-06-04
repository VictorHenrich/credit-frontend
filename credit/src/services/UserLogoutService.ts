import { NavigateFunction } from "react-router-dom";
import ServiceProps from "../utils/interfaces";


export interface UserLogoutServiceProps{
    navigator: NavigateFunction
}

export default class UserLogoutService implements ServiceProps<void>{
    constructor(private props: UserLogoutServiceProps){}

    execute(): void{
        localStorage.removeItem(import.meta.env.VITE_TOKEN_DATA_NAME);

        this.props.navigator(import.meta.env.VITE_HOME_PATH);
    }
}
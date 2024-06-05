import React from "react";
import { RouteObject } from "react-router-dom";
import UnauthorizedPage from "../../pages/unauthorized";
import AuthService from "../../services/AuthService";



export default function PrivateRoute({ element }: Pick<RouteObject, "element">): React.ReactNode{
    const [ authenticatedUser, setAuthenticatedUser] = React.useState<boolean>(true);
    
    React.useEffect(()=> {
        setAuthenticatedUser(AuthService.checkUserLogged());
    }, []);

    return (
        authenticatedUser
            ? element
            : <UnauthorizedPage />
    );
}
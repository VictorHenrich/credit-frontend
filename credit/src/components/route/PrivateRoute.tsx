import React from "react";
import { RouteObject } from "react-router-dom";



export default function PrivateRoute({ element }: Pick<RouteObject, "element">): React.ReactNode{
    const [ authenticatedUser, setAuthenticatedUser] = React.useState<boolean>(false);

    async function validateUserToken(): Promise<void>{
        setAuthenticatedUser(false);
    }

    React.useEffect(()=> {
        validateUserToken();
    }, []);

    return (
        !authenticatedUser
            ? <div>Acesso negado</div>
            : element
    );
}
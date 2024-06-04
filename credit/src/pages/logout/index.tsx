import React from "react";
import { Stack, Spinner } from "@chakra-ui/react";
import HeadingDefault from "../../components/heading";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";




export default function LogoutPage(): React.ReactElement{
    const navigator = useNavigate();

    React.useEffect(()=> {    
        setTimeout(()=> {
            AuthService.logout(navigator);
        }, 1000);
    }, []);

    return (
        <Stack
            width="100vw"
            height="100vh"
            backgroundColor="primary"
            align="center"
            justify="center"
            spacing={10}
        >
            <HeadingDefault
                color="secondary"
                fontSize={30}
            >
                Você será redirecionado para a página de login. Por favor, aguarde.
            </HeadingDefault>
            <Spinner 
                size="xl"
                color="secondary"
            />
        </Stack>
    )
}
import React from "react";
import { Center, Stack, Image } from "@chakra-ui/react";
import HeadingDefault from "../../components/heading";
import UnauthorizedImage from "../../assets/unauthorized.jpg"
import ButtonDefault from "../../components/button";
import { useNavigate, NavigateFunction } from "react-router-dom";


export default function UnauthorizedPage(): React.ReactElement{
    const navigator: NavigateFunction = useNavigate();

    function handleClick(){
        navigator(import.meta.env.VITE_HOME_PATH);
    }

    return (
        <Center width="100vw" height="100vh">
            <Stack
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                spacing={10}
            >
                <HeadingDefault
                    color="primary"
                >
                    Você não tem permissão para acessar esta página!
                </HeadingDefault>
                <Image 
                    src={UnauthorizedImage}
                    height="60%"
                    width="auto"
                />
                <ButtonDefault
                    width="10%"
                    backgroundColor="primary"
                    color="secondary"
                    onClick={handleClick}
                >Voltar ao inicio</ButtonDefault>
            </Stack>
        </Center>
    )
}
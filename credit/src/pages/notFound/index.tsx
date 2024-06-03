import React from "react";
import { Center, Image, Stack } from "@chakra-ui/react";
import HeadingDefault from "../../components/heading";
import NotFoundImage from "../../assets/notfound.png";
import ButtonDefault from "../../components/button";



export default function NotFoundPage(): React.ReactElement{
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
                    Página não localizada!
                </HeadingDefault>
                <Image 
                    src={NotFoundImage}
                    height="60%"
                    width="auto"
                />
                <ButtonDefault
                    width="10%"
                    backgroundColor="primary"
                    color="secondary"
                >Voltar ao inicio</ButtonDefault>
            </Stack>
        </Center>
    )
}
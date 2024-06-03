import React from "react"
import { Center, Image, Stack, Link } from "@chakra-ui/react";
import Slogan from "../../assets/slogan.png";
import InputDefault from "../../components/input";
import ButtonDefault from "../../components/button";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import HeadingDefault from "../../components/heading";
import TextDefault from "../../components/text";
import LoadingDefault from "../../components/loading";
import { UserTypes } from "../../entities/User";


export default function HomePage(): React.ReactElement{
    const [typeUser, setTypeUser] = React.useState<UserTypes | null>(null);

    return (
        <Stack
            width="100vw"
            height="100vh"
            direction="row"
            spacing={0}
        >
            <Center
                width="40%"
                height="100%"
                backgroundColor="secondary"
            >
                <Image src={Slogan}/>
            </Center>
            <Center 
                width="60%"
                height="100%"
                boxSizing="border-box"
                padding={40}
                bgGradient="linear-gradient(to right, secondary 0%, secondary 5%, primary 6%, primary 94%)"
            >
                {
                    !typeUser
                        ? (
                            <Stack
                            direction="column"
                            width="50%"
                            spacing={10}
                        >
                            <Stack
                                direction="column"
                                spacing={5}
                                marginBottom={10}
                            >
                                <HeadingDefault>
                                    Login
                                </HeadingDefault>
                                <TextDefault>
                                    Escolha sua função para acessar sua conta
                                </TextDefault>
                            </Stack>
                            <ButtonDefault
                                onClick={() => setTypeUser(UserTypes.EMPLOYEE)}
                            >Sou funcionário</ButtonDefault>
                            <ButtonDefault onClick={() => setTypeUser(UserTypes.EMPLOYEE)}>Sou Representante</ButtonDefault>
                        </Stack>
                        )

                    : (
                    <Stack
                        direction="column"
                        width="90%"
                        spacing={5}
                    >
                        <Stack
                            direction="column"
                            spacing={5}
                            marginBottom={10}
                        >
                            <HeadingDefault>
                                Login
                            </HeadingDefault>
                            <TextDefault>
                                Preencha os campos abaixo com os seus dados de acesso.
                            </TextDefault>
                        </Stack>
                        <InputDefault 
                            type="email"
                            placeholder="Digite seu email..."
                            color="secondary"
                            icon={EmailIcon}
                        />
                        <InputDefault 
                            type="password"
                            placeholder="Digite sua senha..."
                            color="secondary"
                            icon={LockIcon}
                        />
                        <Stack
                            width="100%"
                            marginTop={5}
                            justifyContent="space-between"
                        >
                            <Link 
                                textAlign="right"
                                color="secondary"
                                fontFamily='"Open Sans", sans-serif'
                            >
                                Esqueci minha senha
                            </Link>
                        </Stack>

                        <Center>
                            <ButtonDefault
                                width="50%"
                            >
                                Acessar
                            </ButtonDefault>
                        </Center>
                    </Stack>
                    )
                }
                
                
            </Center>
            <LoadingDefault open={false} />
        </Stack>
    );
}
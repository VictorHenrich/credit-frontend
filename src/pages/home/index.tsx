import React from "react"
import { Center, Image, Stack, Link } from "@chakra-ui/react";
import Slogan from "../../assets/slogan.png";
import InputDefault from "../../components/input";
import ButtonDefault from "../../components/button";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import HeadingDefault from "../../components/heading";
import TextDefault from "../../components/text";
import LoadingDefault from "../../components/loading";
import UserEntity, { UserTypes } from "../../entities/User";
import AlertDefault, { AlertDefaultProps } from "../../components/alert";
import AuthService from "../../services/AuthService";
import { NavigateFunction, useNavigate } from "react-router-dom";


export default function HomePage(): React.ReactElement{
    const [userType, setUserType] = React.useState<UserTypes | null>(null);

    const [userData, setUserData] = React.useState<UserEntity>({
        email: "",
        password: ""
    })

    const [openLoading, setOpenLoading] = React.useState<boolean>(false);

    const [alertData, setAlertData] = React.useState<AlertDefaultProps>({
        description: "",
        status: "info",
        open: false
    });

    const navigator: NavigateFunction = useNavigate();

    function handleSetUserData(user: Partial<UserEntity>){
        setUserData({ ...userData, ...user });
    }

    async function auth(): Promise<void>{
        if(!userType) return;

        setOpenLoading(true);

        try{

            await AuthService.authenticate(userType, navigator, userData);

        }catch(error){
            setAlertData({
                description: "Usuário ou senha estão inválidos",
                open: true,
                status: "error"
            });
        }

        setOpenLoading(false);
    }

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
                backgroundColor="primary"
            >
                {
                    !userType
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
                                onClick={() => setUserType(UserTypes.EMPLOYEE)}
                            >Sou funcionário</ButtonDefault>
                            <ButtonDefault onClick={() => setUserType(UserTypes.AGENT)}>Sou Representante</ButtonDefault>
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
                            color="secondary"
                            icon={EmailIcon}
                            inputProps={{
                                type: "email",
                                placeholder: "Digite seu email...",
                                onChange: ({ target: { value: email } }) => handleSetUserData({ email })
                            }}
                        />
                        <InputDefault 
                            type="password"
                            placeholder="Digite sua senha..."
                            color="secondary"
                            icon={LockIcon}
                            inputProps={{
                                type: "password",
                                placeholder: "Digite sua senha...",
                                onChange: ({ target: { value: password } }) => handleSetUserData({ password })
                            }}
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
                                onClick={()=> auth()}
                            >
                                Acessar
                            </ButtonDefault>
                        </Center>
                    </Stack>
                    )
                }
                
                
            </Center>
            <LoadingDefault open={openLoading} />
            <AlertDefault 
                {...alertData}
                onClose={() => setAlertData({...alertData, open: false })}
            />
        </Stack>
    );
}
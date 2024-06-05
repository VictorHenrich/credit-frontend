import React from "react";
import { Avatar, Center, Stack, InputProps } from "@chakra-ui/react";
import InputDefault from "../../../components/input";
import { EmployeeContext, EmployeeContextProps } from "../../../providers/employee";
import ButtonDefault from "../../../components/button";
import EmployeeService from "../../../services/EmployeeService";
import LoadingDefault from "../../../components/loading";
import AlertDefault, { AlertDefaultProps } from "../../../components/alert";




export default function EmployeeProfilePage(): React.ReactElement{
    const {
        employee,
        setEmployee,
        loadEmployee
    }: EmployeeContextProps = React.useContext<EmployeeContextProps>(EmployeeContext);

    const [openLoading, setOpenLoading] = React.useState<boolean>(false);

    const [alertProps, setAlertProps] = React.useState<AlertDefaultProps>({
        open: false,
        title: "",
        description: "",
    })

    const inputStyle: Partial<InputProps> = {
        _focus: {
            background: "secondary",
            color: "primary"
        }
    }

    React.useEffect(()=>{
        loadEmployee();
    }, []);

    async function loadProfile(): Promise<void>{
        try{
            await loadEmployee();

        }catch(error){
            handleAlertProps({
                open: true,
                status: "error",
                description: "Falha ao carregar dados do perfil!"
            });
        }
    }

    async function updateProfile(): Promise<void>{
        setOpenLoading(true);

        try{
            await EmployeeService.updateEmployee(employee);

            handleAlertProps({
                open: true,
                status: "success",
                description: "Perfil atualizado com sucesso!"
            });

        }catch(error){
            handleAlertProps({
                open: true,
                status: "error",
                description: "Falha ao realizar alteração de perfil!"
            })
        }

        await loadProfile();

        setOpenLoading(false);
    }

    function handleAlertProps(props: Partial<AlertDefaultProps>){
        setAlertProps({ ...alertProps, ...props });
    }

    return (
        <Stack 
            width="100%" 
            height="100%"
            boxSizing="border-box"
            justify="center"
            align="center"
            direction="column"
            spacing={50}
        >
            <Center>
                <Avatar 
                    size="xl"
                />
            </Center>
            <Stack
                direction="column"
                width="70%"
                height="70%"
                justify="center"
                align="center"
                borderRadius={10}
                borderWidth={5}
                borderColor="rgba(255, 255, 255, 0.3)"
                spacing={10}
            >
                <InputDefault 
                    label="Nome"
                    width="50%"
                    color="secondary"
                    inputProps={{
                        type: "text",
                        value: employee.name,
                        onChange: ({target}) => {
                            setEmployee({ name: target.value})
                        },
                        ...inputStyle
                    }}
                    
                />
                <InputDefault 
                    label="Email" 
                    width="50%"
                    color="secondary"
                    inputProps={{
                        type: "email",
                        value: employee.email,
                        onChange: ({target}) => {
                            setEmployee({ email: target.value})
                        },
                        ...inputStyle
                    }}
                />

                <InputDefault 
                    width="50%"
                    label="CPF"
                    color="secondary"
                    inputProps={{
                        type: "text",
                        value: employee.documentCPF,
                        onChange: ({target}) => {
                            setEmployee({ documentCPF: target.value})
                        },
                        ...inputStyle
                    }}
                />

                <InputDefault 
                    width="50%"
                    label="Salário" 
                    color="secondary"
                    inputProps={{
                        type: "text",
                        value: `R$ ${employee.salary}`,
                        onChange: ({target}) => {
                            setEmployee({ salary: parseInt(target.value) || 0})
                        },
                        ...inputStyle
                    }}
                />
            </Stack>
            <ButtonDefault 
                width="20%"
                onClick={updateProfile}
            >
                Alterar
            </ButtonDefault>
            <LoadingDefault 
                open={openLoading}
            />
            <AlertDefault 
                {...alertProps}
                onClose={()=> handleAlertProps({ open: false })}
            />
        </Stack>
    )
}
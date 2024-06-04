import React from "react";
import { Avatar, Center, Stack, InputProps } from "@chakra-ui/react";
import InputDefault from "../../../components/input";
import { EmployeeContext, EmployeeContextProps } from "../../../providers/employee";
import ButtonDefault from "../../../components/button";




export default function EmployeeProfilePage(): React.ReactElement{
    const {
        employee,
        setEmployee,
        loadEmployee
    }: EmployeeContextProps = React.useContext<EmployeeContextProps>(EmployeeContext);


    const inputStyle: Partial<InputProps> = {
        _focus: {
            background: "secondary",
            color: "primary"
        }
    }

    React.useEffect(()=>{
        loadEmployee();
    }, []);

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
            <ButtonDefault width="20%">Alterar</ButtonDefault>
        </Stack>
    )
}
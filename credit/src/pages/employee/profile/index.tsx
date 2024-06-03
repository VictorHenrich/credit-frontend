import React from "react";
import { Avatar, Center, Stack, InputProps } from "@chakra-ui/react";
import InputDefault from "../../../components/input";
import { EmployeeContext, EmployeeContextProps } from "../../../providers/employee";
import ButtonDefault from "../../../components/button";




export default function EmployeeProfilePage(): React.ReactElement{
    const {
        employee,
        setEmployee
    }: EmployeeContextProps = React.useContext<EmployeeContextProps>(EmployeeContext);


    const inputStyle: Partial<InputProps> = {
        _focus: {
            background: "secondary",
            color: "primary"
        }
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
            >
                <InputDefault 
                    type="text"
                    label="Nome"
                    width="50%"
                    value={employee.name}
                    inputProps={{
                        onChange: ({target}) => {
                            setEmployee({ name: target.value})
                        },
                        ...inputStyle
                    }}
                    
                />
                <InputDefault 
                    type="email" 
                    width="50%"
                    label="Email"
                    value={employee.email}
                    inputProps={{
                        onChange: ({target}) => {
                            setEmployee({ email: target.value})
                        },
                        ...inputStyle
                    }}
                />

                <InputDefault 
                    type="text"
                    width="50%"
                    label="CPF"
                    value={employee.documentCPF}
                    inputProps={{
                        onChange: ({target}) => {
                            setEmployee({ documentCPF: target.value})
                        },
                        ...inputStyle
                    }}
                />

                <InputDefault 
                    type="number"
                    width="50%"
                    label="Salário" 
                    value={`R$ ${employee.salary}`}
                    inputProps={{
                        onChange: ({target}) => {
                            setEmployee({ salary: parseInt(target.value)})
                        },
                        ...inputStyle
                    }}
                />
            </Stack>
            <ButtonDefault width="20%">Alterar</ButtonDefault>
        </Stack>
    )
}
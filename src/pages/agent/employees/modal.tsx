import React from "react";
import ModalDefault, { ModalDefaultProps } from "../../../components/modal";
import { Stack } from "@chakra-ui/react";
import InputDefault from "../../../components/input";
import EmployeeEntity from "../../../entities/Employee";


export interface AgentEmployeeModalProps extends Pick<ModalDefaultProps, "open" | "onClose" | "title" | "buttonEditName">{
    employee?: EmployeeEntity,
    onConfirm: (employee: EmployeeEntity) => void
}

export default function AgentEmployeeModal({
    employee,
    open,
    title,
    onConfirm,
    onClose,
    buttonEditName
}: AgentEmployeeModalProps): React.ReactElement{
    const newEmployee: EmployeeEntity = {
        documentCPF: "",
        email: "",
        name: "",
        password: "",
        salary: 0,
        score: 0,
        uuid: ""
    }

    const [employeeData, setEmployeeData] = React.useState<EmployeeEntity>(newEmployee);

    function setEmployee(props: Partial<EmployeeEntity>){
        setEmployeeData({ ...employeeData, ...props });
    }

    React.useEffect(()=> {
        setEmployee(employee || newEmployee);
    }, [employee, open]);


    return (
        <ModalDefault 
            onClose={onClose}
            onConfirm={()=> onConfirm(employeeData)}
            open={open}
            title={title}
            buttonEditName={buttonEditName}
            buttonEditProps={{
                backgroundColor: "green"
            }}
        >
            <Stack
                direction="column"
                spacing={5}
            >
                <InputDefault
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }}
                    label="Nome" 
                    color="primary"
                    inputProps={{
                        type: "text",
                        value: employeeData.name,
                        onChange: ({target}) => {
                            setEmployee({ name: target.value})
                        },
                    }}
                />
                <InputDefault
                    label="CPF"
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }}
                    color="primary"
                    inputProps={{
                        type: "text",
                        value: employeeData.documentCPF,
                        onChange: ({target}) => {
                            setEmployee({ documentCPF: target.value})
                        },
                    }}
                />
                <InputDefault
                    label="Email"
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }} 
                    color="primary"
                    inputProps={{
                        type: "email",
                        value: employeeData.email,
                        onChange: ({target}) => {
                            setEmployee({ email: target.value})
                        },
                    }}
                />
                <InputDefault 
                    label="Salário"
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }}
                    color="primary"
                    inputProps={{
                        type: "number",
                        value: employeeData.salary,
                        onChange: ({target}) => {
                            setEmployee({ salary: parseInt(target.value)})
                        }
                    }}
                />

                <InputDefault 
                    label="Pontuação"
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }} 
                    color="primary"
                    inputProps={{
                        type: "text",
                        value: `${employeeData.score}`,
                        onChange: ({target}) => {
                            setEmployee({ score: parseInt(target.value) || 0})
                        },
                    }}
                />
                <InputDefault 
                    label="Senha"
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }} 
                    color="primary"
                    inputProps={{
                        type: "password",
                        value: employeeData.password,
                        onChange: ({target}) => {
                            setEmployee({ password: target.value})
                        },
                    }}
                />
            </Stack>
        </ModalDefault>
    );
}
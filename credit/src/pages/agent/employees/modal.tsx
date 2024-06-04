import React from "react";
import ModalDefault, { ModalDefaultProps } from "../../../components/modal";
import { Stack } from "@chakra-ui/react";
import InputDefault from "../../../components/input";
import EmployeeEntity from "../../../entities/Employee";


export interface AgentEmployeeModalProps extends Pick<ModalDefaultProps, "open" | "onClose">{
    employee?: EmployeeEntity,
    onConfirm: (employee: EmployeeEntity) => void
}

export default function AgentEmployeeModal({
    employee,
    open,
    onConfirm,
    onClose
}: AgentEmployeeModalProps): React.ReactElement{
    const [employeeData, setEmployeeData] = React.useState<EmployeeEntity>({
        documentCPF: "",
        email: "",
        name: "",
        password: "",
        salary: 0,
        score: 0,
        uuid: ""
    });

    function setEmployee(props: Partial<EmployeeEntity>){
        setEmployeeData({ ...employeeData, ...props });
    }

    React.useEffect(()=> {
        if(!employee) return;

        setEmployee(employee);
    }, [employee]);

    return (
        <ModalDefault 
            onClose={onClose}
            onConfirm={()=> onConfirm(employeeData)}
            open={open}
            title="Cadastro de Funcionário"
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
                    color="secondary"
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
                    color="secondary"
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
                    color="secondary"
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
                    color="secondary"
                    inputProps={{
                        type: "text",
                        value: `R$ ${employeeData.salary}`,
                        onChange: ({target}) => {
                            setEmployee({ salary: parseInt(target.value) || 0})
                        }
                    }}
                />

                <InputDefault 
                    label="Pontuação"
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }} 
                    color="secondary"
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
                    color="secondary"
                    inputProps={{
                        type: "password",
                        value: `${employeeData.password}`,
                        onChange: ({target}) => {
                            setEmployee({ password: target.value})
                        },
                    }}
                />
            </Stack>
        </ModalDefault>
    );
}
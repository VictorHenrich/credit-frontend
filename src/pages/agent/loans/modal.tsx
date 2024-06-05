import React from "react";
import ModalDefault, { ModalDefaultProps } from "../../../components/modal";
import { Stack } from "@chakra-ui/react";
import InputDefault from "../../../components/input";
import LoanEntity from "../../../entities/Loan";


export interface AgentLoanModalProps extends Pick<ModalDefaultProps, "open" | "onClose" | "title" | "buttonEditName">{
    loan?: LoanEntity,
    onConfirm: (loan: LoanEntity) => void
}

export default function AgentLoanModal({
    loan,
    open,
    title,
    onConfirm,
    onClose,
    buttonEditName
}: AgentLoanModalProps): React.ReactElement{
    const newLoan: LoanEntity = {
        description: "",
        maxInstallments: 0,
        minSalary: 0,
        minScore: 0,
        uuid: ""
    }

    const [loanData, setLoanData] = React.useState<LoanEntity>(newLoan);

    function setLoan(props: Partial<LoanEntity>){
        setLoanData({ ...loanData, ...props });
    }

    React.useEffect(()=> {
        setLoan(loan || newLoan);
    }, [loan, open]);


    return (
        <ModalDefault 
            onClose={onClose}
            onConfirm={()=> onConfirm(loanData)}
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
                    label="Descrição" 
                    color="primary"
                    inputProps={{
                        type: "text",
                        value: loanData.description,
                        onChange: ({target}) => {
                            setLoan({ description: target.value})
                        },
                    }}
                />
                <InputDefault
                    label="Max. de parcelas"
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }}
                    color="primary"
                    inputProps={{
                        type: "text",
                        value: loanData.maxInstallments,
                        onChange: ({target}) => {
                            setLoan({ maxInstallments: parseInt(target.value) || 0})
                        },
                    }}
                />
                <InputDefault
                    label="Min. Salário"
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }} 
                    color="primary"
                    inputProps={{
                        type: "text",
                        value: loanData.minSalary,
                        onChange: ({target}) => {
                            setLoan({ minSalary: parseInt(target.value) || 0 })
                        },
                    }}
                />
                <InputDefault 
                    label="Min. Pontuação"
                    labelProps={{
                        color: "black",
                        fontSize: 15
                    }}
                    color="primary"
                    inputProps={{
                        type: "text",
                        value: loanData.minScore,
                        onChange: ({target}) => {
                            setLoan({ minScore: parseInt(target.value) || 0 })
                        }
                    }}
                />
            </Stack>
        </ModalDefault>
    );
}
import React from "react";
import ModalDefault, { ModalDefaultProps } from "../../../components/modal";
import { Stack } from "@chakra-ui/react";
import LoanEntity from "../../../entities/Loan";
import TableDefault, { TableItemProps } from "../../../components/table";
import EmployeeLoanService from "../../../services/EmployeeLoanService";
import AlertDefault, { AlertDefaultProps } from "../../../components/alert";
import EmployeeLoanEntity from "../../../entities/EmployeeLoan";
import InputDefault from "../../../components/input";


type LoanDataType = Pick<EmployeeLoanEntity, "value" | "numberInstallments">;

export type LoanDataResult = Pick<EmployeeLoanEntity, "loan" | "value" | "numberInstallments">

export interface EmployeeLoanModalProps extends Pick<ModalDefaultProps, "open" | "onClose">{
    onConfirm: (loan: LoanDataResult) => void
}


export default function EmployeeLoanModal({
    onClose,
    onConfirm,
    open
}: EmployeeLoanModalProps): React.ReactElement{
    const [loanData, setLoanData] = React.useState<LoanDataType>({
        value: 0,
        numberInstallments: 0
    });

    const [loans, setLoans] = React.useState<LoanEntity[]>([]);

    const [itemSelected, setItemSelected] = React.useState<TableItemProps | undefined>(undefined);

    const [alertProps, setAlertProps] = React.useState<AlertDefaultProps>({
        open: false,
        title: "",
        description: "",
    });

    function handleAlertProps(props: Partial<AlertDefaultProps>): void{
        setAlertProps({ ...alertProps, ...props });
    }

    function handleLoanProps(props: Partial<LoanDataType>): void{
        setLoanData({ ...loanData, ...props });
    }

    async function findLoans(){
        try{
            const loans: LoanEntity[] = await EmployeeLoanService.findEmployeeLoansReleased();

            setLoans(loans);

        }catch(error){
            handleAlertProps({
                open: true,
                status: "error",
                description: (
                    "Sua conta não possui nenhum empréstimo liberado devido" +
                    "ao valor solicitado ou ao score não atingido. Por favor, " +
                    "consulte seu supervisor para mais informações."
                )
            })
        }
    }

    React.useEffect(()=> {
        if(open)
            findLoans();
    }, [open]);

    return (
        <ModalDefault
            modalProps={{
                size: "2xl"
            }}
            onClose={onClose}
            onConfirm={()=> {
                if(!itemSelected) return;

                onConfirm({ loan: itemSelected.data, ...loanData });
            }}
            open={open}
            buttonEditProps={{
                disabled: true
            }}
            buttonEditName="Cadastrar"
            title="Cadastro de empréstimo"
        >
            <Stack
                width="100%"
                height="100%"
                direction="column"
                spacing={5}
            >
                <TableDefault
                    itemSelected={itemSelected}
                    actionsProps={{
                        has: false,
                        onDelete: ()=> null,
                        onEdit: ()=> null,
                        onClick: (item)=> setItemSelected(itemSelected ? undefined : item)
                    }}
                    body={loans.map((loan, index) => {
                        return {
                            id: index,
                            data: loan,
                            rows: [
                                {
                                    value: loan.description,
                                    textAlign: "left"
                                },
                                {
                                    value: loan.minScore,
                                    isNumeric: true
                                },
                                {
                                    value: loan.minSalary,
                                    isNumeric: true
                                },
                                {
                                    value: loan.maxInstallments,
                                    isNumeric: true
                                }
                            ]
                        }
                    })}
                    header={[
                        {value: "Descrição", textAlign: "left"},
                        {value: "Min. Pontuação", isNumeric: true},
                        {value: "Min. Salário", isNumeric: true},
                        {value: "Max. Parcelas", isNumeric: true}
                    ]}
                />
                <InputDefault
                    label="Quantidade de parcelas"
                    labelProps={{
                        color: "primary"
                    }}
                    inputProps={{
                        type: "number",
                        value: loanData.value,
                        onChange: ({ target: { value }}) => {
                            handleLoanProps({ value: parseInt(value) });
                        }
                    }}
                />
                <InputDefault
                    label="Valor do empréstimo"
                    labelProps={{
                        color: "primary"
                    }}
                    inputProps={{
                        type: "number",
                        value: loanData.numberInstallments,
                        onChange: ({ target: { value }}) => {
                            handleLoanProps({ numberInstallments: parseInt(value) });
                        }
                    }}
                />
            </Stack>
            <AlertDefault {...alertProps}/>
        </ModalDefault>
    )
}
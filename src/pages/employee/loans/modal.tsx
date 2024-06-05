import React from "react";
import ModalDefault, { ModalDefaultProps } from "../../../components/modal";
import { Center, Stack } from "@chakra-ui/react";
import LoanEntity from "../../../entities/Loan";
import TableDefault, { TableItemProps } from "../../../components/table";
import EmployeeLoanService from "../../../services/EmployeeLoanService";
import AlertDefault, { AlertDefaultProps } from "../../../components/alert";
import EmployeeLoanEntity from "../../../entities/EmployeeLoan";
import InputDefault from "../../../components/input";
import ButtonDefault from "../../../components/button";


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
    const newLoanData: LoanDataType = {
        value: 0,
        numberInstallments: 0
    }

    const [loanData, setLoanData] = React.useState<LoanDataType>(newLoanData);

    const [installments, setInstallments] = React.useState<TableItemProps<number>[]>([]);

    const [loans, setLoans] = React.useState<LoanEntity[]>([]);

    const [itemSelected, setItemSelected] = React.useState<TableItemProps<LoanEntity> | undefined>(undefined);

    const [alertProps, setAlertProps] = React.useState<AlertDefaultProps>({
        open: false,
        title: "",
        description: "",
    });

    function simulateLoan(){
        if(!loanData.value){
            handleAlertProps({
                open: true,
                status: "warning",
                description: "O valor do empréstimo está zerado!"
            });

            return;
        }

        const numberInstallments: number = loanData.numberInstallments || 1;

        const value: number = loanData.value / numberInstallments;

        setInstallments(
            new Array(numberInstallments)
                .fill(null)
                .map((item, index) => {
                    const installment: number = numberInstallments > 1 ? index + 1 : 1;

                    return {
                        data: item,
                        rows: [
                            { value: installment },
                            { 
                                value , 
                                isNumeric: true 
                            }
                        ]
                    }
                })
        )
    }

    function handleAlertProps(props: Partial<AlertDefaultProps>): void{
        setAlertProps({ ...alertProps, ...props });
    }

    function handleLoanProps(props: Partial<LoanDataType>): void{
        setLoanData({ ...loanData, ...props });
    }

    React.useEffect(()=> {
        if(open){
            setInstallments([]);

            setLoanData(newLoanData);

            handleAlertProps({ open: false });
        
            setItemSelected(undefined);

            findLoans();
        }
    }, [open]);

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

    function handleOnConfirm(): void{
        if(!loanData.value){
            handleAlertProps({
                open: true,
                status: "warning",
                description: "O valor do empréstimo está zerado!"
            });

            return;
        }

        if(!itemSelected){
            handleAlertProps({
                open: true,
                status: "warning",
                description: "Selecione um empréstimo!"
            })

            return;
        }

        onConfirm({ loan: itemSelected.data, ...loanData });
    }

    return (
        <ModalDefault
            modalProps={{
                size: "2xl"
            }}
            onClose={onClose}
            onConfirm={handleOnConfirm}
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
                        onClick: (item)=> setItemSelected(itemSelected && itemSelected.id === item.id ? undefined : item)
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
                    label="Valor do empréstimo"
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
                    label="Quantidade de parcelas"
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
                <Stack 
                    width="100%"
                    direction="row"
                    justify="space-between"
                >
                    <ButtonDefault
                        backgroundColor="tertiary"
                        width="30%"
                        color="secondary"
                        _hover={{
                            backgroundColor: "green"
                        }}
                        onClick={simulateLoan}
                    >
                        Simular parcelas
                    </ButtonDefault>
                    <Center width="50%">
                        {
                            installments.length
                                ? (
                                    <TableDefault 
                                        actionsProps={{
                                            has: false,
                                            onClick: ()=> null,
                                            onDelete: ()=> null,
                                            onEdit: ()=> null
                                        }}
                                        
                                        header={[
                                            { value: "Parcela"},
                                            { value: "R$ Valor da parcela", isNumeric: true }
                                        ]}

                                        body={installments}

                                        footer={[
                                            {value: ""},
                                            { 
                                                value: `Valor total: ${loanData.value || 0}`,
                                                isNumeric: true
                                            }
                                        ]}
                                    />
                                )
                                : undefined
                        }
                    </Center>
                </Stack>
            </Stack>
            <AlertDefault 
                {...alertProps}
                onClose={()=> handleAlertProps({ open: false })}
            />
        </ModalDefault>
    )
}
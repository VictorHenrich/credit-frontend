import React from "react";
import { Stack, Icon } from "@chakra-ui/react";
import EmployeeLoansTable from "./table";
import ButtonDefault from "../../../components/button";
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import EmployeeLoanModal, { LoanDataResult } from "./modal";
import EmployeeLoanService from "../../../services/EmployeeLoanService";
import AlertDefault, { AlertDefaultProps } from "../../../components/alert";
import LoadingDefault from "../../../components/loading";
import { EmployeeContext, EmployeeContextProps } from "../../../providers/employee";


export default function EmployeeLoansPage(): React.ReactElement{
    const {
        loadLoans
    }: EmployeeContextProps = React.useContext(EmployeeContext);

    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const [alertProps, setAlertProps] = React.useState<AlertDefaultProps>({
        open: false,
        title: "",
        description: "",
    });

    const [openLoading, setOpenLoading] = React.useState<boolean>(false);

    function handleAlertProps(props: Partial<AlertDefaultProps>): void{
        setAlertProps({ ...alertProps, ...props });
    }

    async function handleLoadLoans(): Promise<void>{
        setOpenLoading(true);

        try{
            await loadLoans();

        }catch(error){
            handleAlertProps({
                open: true,
                description: "Falha ao carregar lista de empréstimos!",
                status: "error"
            });
        }

        setOpenLoading(false);
    }

    async function handleCreateEmployeeLoan(loanData: LoanDataResult): Promise<void>{
        setOpenModal(false);

        setOpenLoading(true);

        try{
            await EmployeeLoanService.createEmployeeLoan(loanData);

            handleAlertProps({
                open: true,
                description: "Empréstimo realizado com sucesso!",
                status: "success"
            });

            await handleLoadLoans();

        }catch(error){
            handleAlertProps({
                open: true,
                description: "Falha ao realizar o empréstimo. Acione o suporte técnico!",
                status: "error"
            });
        }

        setOpenLoading(false);
    }

    React.useEffect(()=> {
        handleLoadLoans();
    }, []);

    return (
        <Stack 
            width="80%" 
            height="80%"
            align="center"
            justify="center"
            spacing={5}
        >
            <Stack
                width="100%"
                direction="row"
                spacing={2}
                align="center"
                justify="flex-end"
            >
                <ButtonDefault 
                    width="auto"
                    onClick={handleLoadLoans}
                >
                    Procurar
                    <Icon 
                        as={MdOutlineSearch} 
                        fontSize={20}
                        marginLeft={2}
                    />
                </ButtonDefault>
                <ButtonDefault 
                    width="auto"
                    onClick={()=> setOpenModal(true)}
                >
                    Solicitar emprestimo
                    <Icon 
                        as={MdAdd} 
                        fontSize={20}
                        marginLeft={2}
                    />
                </ButtonDefault>
            </Stack>
            <EmployeeLoansTable />
            <EmployeeLoanModal 
                open={openModal}
                onClose={()=> setOpenModal(false)}
                onConfirm={handleCreateEmployeeLoan}
            />
            <AlertDefault 
                {...alertProps}
                onClose={()=> handleAlertProps({ open: false })}
            />
            <LoadingDefault open={openLoading}/>
        </Stack>
    )
}
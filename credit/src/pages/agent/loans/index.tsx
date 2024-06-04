import React from "react";
import { Stack, Icon } from "@chakra-ui/react";
import ButtonDefault from "../../../components/button";
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import AgentLoansTable from "./table";
import { AgentContext, AgentContextProps } from "../../../providers/agent";
import LoadingDefault from "../../../components/loading";
import AgentLoanDialog from "./dialog";
import AgentLoanModal, { AgentLoanModalProps } from "./modal";
import AlertDefault, { AlertDefaultProps } from "../../../components/alert";
import LoanEntity from "../../../entities/Loan";
import LoanService from "../../../services/LoanService";

type ModalParamProps = Pick<AgentLoanModalProps, "open" | "title" | "buttonEditName">;

export default function AgentLoansPage(): React.ReactElement{
    const {
        loadLoans
    }: AgentContextProps = React.useContext(AgentContext);

    const [openLoading, setOpenLoading] = React.useState<boolean>(false);

    const [modalProps, setModalProps] = React.useState<ModalParamProps>({
        open: false,
        title: "Cadastro",
        buttonEditName: "cadastrar"
    });

    const [alertProps, setAlertProps] = React.useState<AlertDefaultProps>({
        open: false,
        title: "",
        description: "",
    })

    const [openDialog, setOpenDialog] = React.useState<boolean>(false);

    const [loanSelected, setLoanSelected] = React.useState<LoanEntity | undefined>();


    async function handleLoadLoans(): Promise<void>{
        setOpenLoading(true);

        try{
            await loadLoans();

        }catch(error){
            setAlertProps({
                open: true,
                status: "error",
                description: "Falha ao carregar funcionários!"
            });
        }

        setOpenLoading(false);
    }


    async function handleCreateLoan(loan: LoanEntity): Promise<void>{
        setOpenLoading(true);

        try{
            await LoanService.createLoan(loan);

            setAlertProps({
                open: true,
                status: "success",
                description: "Funcionário criado com sucesso"
            });

        }catch(error){
            setAlertProps({
                open: true,
                status: "error",
                description: "Falha ao cadastrar usuário!"
            });
        }

        setOpenLoading(false);
    }


    async function handleUpdateLoan(loan: LoanEntity): Promise<void>{
        setOpenLoading(true);

        try{
            await LoanService.updateLoan(loan);

            setAlertProps({
                open: true,
                status: "success",
                description: "Funcionário atualizado com sucesso!"
            });

        }catch(error){
            setAlertProps({
                open: true,
                status: "error",
                description: "Falha ao alterar funcionário!"
            });
        }

        setOpenLoading(false);
    }

    async function deleteLoan(): Promise<void>{
        if(!loanSelected) return;

        setOpenDialog(false);

        setLoanSelected(undefined);

        setOpenLoading(true);

        try{
            await LoanService.deleteLoan(loanSelected);

            setAlertProps({
                open: true,
                status: "success",
                description: "Funcionário excluído com sucesso!"
            });

        }catch(error){
            setAlertProps({
                open: true,
                status: "error",
                description: "Falha ao excluir funcionário!"
            });
        }

        setOpenLoading(false);

        await handleLoadLoans();
    }

    async function createOrUpdateLoan(loan: LoanEntity): Promise<void>{
        handleModalProps({
            open: false,
        })
        
        setLoanSelected(undefined);

        if(!loan.uuid)
            await handleCreateLoan(loan);

        else
            await handleUpdateLoan(loan);

        await handleLoadLoans();
    }


    function handleModalProps(props: Partial<ModalParamProps>): void{
        setModalProps({ ...modalProps, ...props });
    }

    function handleClickEditTable(loan: LoanEntity){
        setLoanSelected(loan);

        handleModalProps({ open: true, buttonEditName: "Alterar" });
    }

    function handleClickDeleteTable(loan: LoanEntity){
        setLoanSelected(loan);

        setOpenDialog(true);
    }

    React.useEffect(()=> {
        handleLoadLoans()
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
                    onClick={()=> {
                        setLoanSelected(undefined);
                        handleModalProps({ open: true, buttonEditName: "Cadastrar"})
                    }}
                >
                    Criar Empréstimo
                    <Icon 
                        as={MdAdd} 
                        fontSize={20}
                        marginLeft={2}
                    />
                </ButtonDefault>
            </Stack>
            <AgentLoansTable 
                onDelete={({ data }) => handleClickDeleteTable(data)}
                onEdit={({ data }) => handleClickEditTable(data)}
            />
            <LoadingDefault open={openLoading}/>
            <AgentLoanModal
                { ...modalProps }
                loan={loanSelected}
                onConfirm={(loan)=> createOrUpdateLoan(loan)}
                onClose={()=> {
                    handleModalProps({ open: false });
                    setLoanSelected(undefined);
                }}
            />
            <AgentLoanDialog
                open={openDialog}
                onClose={()=> {
                    setOpenDialog(false);
                    setLoanSelected(undefined);
                }}
                onConfirm={deleteLoan}
            />
            <LoadingDefault open={openLoading}/>
            <AlertDefault {...alertProps}/>
        </Stack>
    )
}
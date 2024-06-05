import React from "react";
import { Stack, Icon } from "@chakra-ui/react";
import ButtonDefault from "../../../components/button";
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import AgentEmployeesTable from "./table";
import { AgentContext, AgentContextProps } from "../../../providers/agent";
import LoadingDefault from "../../../components/loading";
import AgentEmployeeModal, { AgentEmployeeModalProps } from "./modal";
import EmployeeEntity from "../../../entities/Employee";
import AgentEmployeeDialog from "./dialog";
import EmployeeService from "../../../services/EmployeeService";
import AlertDefault, { AlertDefaultProps } from "../../../components/alert";


type ModalParamProps = Pick<AgentEmployeeModalProps, "open" | "title" | "buttonEditName">;


export default function AgentEmployeesPage(): React.ReactElement{
    const {
        loadEmployees
    }: AgentContextProps = React.useContext(AgentContext);

    const [openLoading, setOpenLoading] = React.useState<boolean>(false);

    const [employeeSelected, setEmployeeSelected] = React.useState<EmployeeEntity | undefined>();

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

    function handleAlertProps(props: Partial<AlertDefaultProps>): void{
        setAlertProps({ ...alertProps, ...props });
    }

    async function handleLoadEmployees(): Promise<void>{
        setOpenLoading(true);

        try{
            await loadEmployees();

        }catch(error){
            setAlertProps({
                open: true,
                status: "error",
                description: "Falha ao carregar funcionários!"
            });
        }

        setOpenLoading(false);
    }


    async function handleCreateEmployee(employee: EmployeeEntity): Promise<void>{
        setOpenLoading(true);

        try{
            await EmployeeService.createEmployee(employee);

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


    async function handleUpdateEmployee(employee: EmployeeEntity): Promise<void>{
        setOpenLoading(true);

        try{
            await EmployeeService.updateEmployeeByUUID(employee);

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

    async function deleteEmployee(): Promise<void>{
        if(!employeeSelected) return;

        setOpenDialog(false);

        setEmployeeSelected(undefined);

        setOpenLoading(true);

        try{
            await EmployeeService.deleteEmployee(employeeSelected);

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

        await handleLoadEmployees();
    }

    async function createOrUpdateEmployee(employee: EmployeeEntity): Promise<void>{
        handleModalProps({
            open: false,
        })
        
        setEmployeeSelected(undefined);

        if(!employee.uuid)
            await handleCreateEmployee(employee);

        else
            await handleUpdateEmployee(employee);

        await handleLoadEmployees();
    }


    function handleModalProps(props: Partial<ModalParamProps>): void{
        setModalProps({ ...modalProps, ...props });
    }

    function handleClickEditTable(employee: EmployeeEntity){
        setEmployeeSelected(employee);

        handleModalProps({ open: true });
    }

    function handleClickDeleteTable(employee: EmployeeEntity){
        setEmployeeSelected(employee);

        setOpenDialog(true);
    }

    React.useEffect(()=> {
        handleLoadEmployees();
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
                    onClick={handleLoadEmployees}
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
                    onClick={() => {
                        setEmployeeSelected(undefined);

                        handleModalProps({ 
                            open: true,
                            buttonEditName: "Cadastrar" 
                        });
                    }}
                >
                    Novo Funcionário
                    <Icon 
                        as={MdAdd} 
                        fontSize={20}
                        marginLeft={2}
                    />
                </ButtonDefault>
            </Stack>
            <AgentEmployeesTable 
                onEdit={({ data }) => {
                    handleClickEditTable(data);
                    handleModalProps({ 
                        buttonEditName: "Alterar",
                        open: true
                    });
                }}
                onDelete={({ data }) => handleClickDeleteTable(data)}
            />
            <AgentEmployeeModal
                { ...modalProps }
                employee={employeeSelected}
                onConfirm={(employee)=> createOrUpdateEmployee(employee)}
                onClose={()=> {
                    handleModalProps({ open: false });
                    setEmployeeSelected(undefined);
                }}
            />
            <AgentEmployeeDialog
                open={openDialog}
                onClose={()=> {
                    setOpenDialog(false);
                    setEmployeeSelected(undefined);
                }}
                onConfirm={deleteEmployee}
            />
            <LoadingDefault open={openLoading}/>
            <AlertDefault
                onClose={()=> handleAlertProps({ open: false })}
                {...alertProps}
            />
        </Stack>
    )
}
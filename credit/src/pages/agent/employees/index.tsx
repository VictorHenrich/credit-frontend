import React from "react";
import { Stack, Icon } from "@chakra-ui/react";
import ButtonDefault from "../../../components/button";
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import AgentEmployeesTable from "./table";
import { AgentContext, AgentContextProps } from "../../../providers/agent";
import LoadingDefault from "../../../components/loading";
import AgentEmployeeModal from "./modal";
import EmployeeEntity from "../../../entities/Employee";
import ModalDefault from "../../../components/modal";
import AgentEmployeeDialog from "./dialog";


export default function AgentEmployeesPage(): React.ReactElement{
    const {
        loadEmployees
    }: AgentContextProps = React.useContext(AgentContext);

    const [openLoading, setOpenLoading] = React.useState<boolean>(false);

    const [employeeSelected, setEmployeeSelected] = React.useState<EmployeeEntity | undefined>();

    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const [openDialog, setOpenDialog] = React.useState<boolean>(false);

    async function handleLoadEmployees(): Promise<void>{
        setOpenLoading(true);

        try{
            await loadEmployees();

        }catch(error){

        }

        setOpenLoading(false);
    }

    async function createOrUpdateEmployee(employee: EmployeeEntity): Promise<void>{
        
    }

    async function deleteEmployee(): Promise<void>{

    }

    function handleClickEditTable(employee: EmployeeEntity){
        setEmployeeSelected(employee);

        setOpenModal(true);
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
                        setOpenModal(true);
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
                onEdit={({ data }) => handleClickEditTable(data)}
                onDelete={({ data }) => handleClickDeleteTable(data)}
            />
            <LoadingDefault open={openLoading}/>
            <AgentEmployeeModal
                open={openModal}
                employee={employeeSelected}
                onConfirm={(employee)=> createOrUpdateEmployee(employee)}
                onClose={()=> {
                    setOpenModal(false);
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
        </Stack>
    )
}
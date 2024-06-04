import React from "react";
import { Stack, Icon } from "@chakra-ui/react";
import ButtonDefault from "../../../components/button";
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import AgentEmployeesTable from "./table";
import { AgentContext, AgentContextProps } from "../../../providers/agent";
import LoadingDefault from "../../../components/loading";


export default function AgentEmployeesPage(): React.ReactElement{
    const {
        loadEmployees
    }: AgentContextProps = React.useContext(AgentContext);

    const [openLoading, setOpenLoading] = React.useState<boolean>(false);

    async function handleLoadEmployees(): Promise<void>{
        setOpenLoading(true);

        try{
            await loadEmployees();

        }catch(error){

        }

        setOpenLoading(false);
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
                <ButtonDefault width="auto">
                    Novo Funcionário
                    <Icon 
                        as={MdAdd} 
                        fontSize={20}
                        marginLeft={2}
                    />
                </ButtonDefault>
            </Stack>
            <AgentEmployeesTable />
            <LoadingDefault open={openLoading}/>
        </Stack>
    )
}
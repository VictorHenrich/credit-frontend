import React from "react";
import { Stack, Icon } from "@chakra-ui/react";
import ButtonDefault from "../../../components/button";
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import AgentLoansTable from "./table";
import { AgentContext, AgentContextProps } from "../../../providers/agent";
import LoadingDefault from "../../../components/loading";


export default function AgentLoansPage(): React.ReactElement{
    const {
        loadLoans
    }: AgentContextProps = React.useContext(AgentContext);

    const [openLoading, setOpenLoading] = React.useState<boolean>(false);

    async function handleLoadLoans(){
        setOpenLoading(true);

        try{
            await loadLoans();
        }catch(error){

        }

        setOpenLoading(false);
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
                <ButtonDefault width="auto">
                    Criar Empréstimo
                    <Icon 
                        as={MdAdd} 
                        fontSize={20}
                        marginLeft={2}
                    />
                </ButtonDefault>
            </Stack>
            <AgentLoansTable />
            <LoadingDefault open={openLoading}/>
        </Stack>
    )
}
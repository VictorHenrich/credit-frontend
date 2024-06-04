import React from "react";
import { Stack, Icon } from "@chakra-ui/react";
import EmployeeLoansTable from "./table";
import ButtonDefault from "../../../components/button";
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";


export default function EmployeeLoansPage(): React.ReactElement{
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
                <ButtonDefault width="auto">
                    Procurar
                    <Icon 
                        as={MdOutlineSearch} 
                        fontSize={20}
                        marginLeft={2}
                    />
                </ButtonDefault>
                <ButtonDefault width="auto">
                    Solicitar emprestimo
                    <Icon 
                        as={MdAdd} 
                        fontSize={20}
                        marginLeft={2}
                    />
                </ButtonDefault>
            </Stack>
            <EmployeeLoansTable />
        </Stack>
    )
}
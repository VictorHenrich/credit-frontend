import React from "react";
import { Table, TableContainer, Thead, Tbody, Tr, Td, Th } from "@chakra-ui/react";
import { AgentContext, AgentContextProps } from "../../../providers/agent";



export default function AgentEmployeesTable(): React.ReactElement{
    const {
        employees
    }: AgentContextProps = React.useContext(AgentContext);

    const columns: string[] = ["Nome", "CPF", "Salário", "Pontuação"];

    return (
        <TableContainer width="100%" height="100%">
            <Table variant='striped' color="secondary">
                <Thead>
                    {...columns.map(column => (
                        <Th color="secondary">{column}</Th>
                    ))}
                </Thead>
                <Tbody>
                    {...employees.map(item => {
                        return (
                            <Tr>
                                <Td>{item.name}</Td>
                                <Td >{item.documentCPF}</Td>
                                <Td isNumeric>{item.salary}</Td>
                                <Td isNumeric>{item.score}</Td>
                            </Tr>
                        )
                    })}

                </Tbody>
            </Table>
        </TableContainer>
    )
}
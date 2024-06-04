import React from "react";
import { Table, TableContainer, Thead, Tbody, Tr, Td, Th } from "@chakra-ui/react";
import { AgentContext, AgentContextProps } from "../../../providers/agent";



export default function AgentLoansTable(): React.ReactElement{
    const {
        loans
    }: AgentContextProps = React.useContext(AgentContext);

    const columns: string[] = ["Descrição", "Min. Pontuação", "Min. Salário", "Max. Parcelas"];

    return (
        <TableContainer width="100%" height="100%">
            <Table variant='striped' color="secondary">
                <Thead>
                    {...columns.map(column => (
                        <Th color="secondary">{column}</Th>
                    ))}
                </Thead>
                <Tbody>
                    {...loans.map(item => {
                        return (
                            <Tr>
                                <Td>{item.description}</Td>
                                <Td isNumeric>{item.minScore}</Td>
                                <Td isNumeric>{item.minSalary}</Td>
                                <Td isNumeric>{item.maxInstallments}</Td>
                            </Tr>
                        )
                    })}

                </Tbody>
            </Table>
        </TableContainer>
    )
}
import React from "react";
import Moment from "moment";
import { Table, TableContainer, Thead, Tbody, Tr, Td, Th } from "@chakra-ui/react";
import EmployeeLoanEntity from "../../../entities/EmployeeLoan";



export interface EmployeeLoansTableProps{
    loans: Omit<EmployeeLoanEntity, "employee">[]
}


export default function EmployeeLoansTable({
    loans
}: EmployeeLoansTableProps): React.ReactElement{

    const columns: string[] = ["Empréstimo", "Data", "Valor"];

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
                                <Td>{item.loan.description}</Td>
                                <Td>{Moment(item.created).format("DD/MM/YYYY")}</Td>
                                <Td>{item.value}</Td>
                            </Tr>
                        )
                    })}

                </Tbody>
            </Table>
        </TableContainer>
    )
}
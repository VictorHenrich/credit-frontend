import React from "react";
import {
    Table, 
    TableContainer, 
    Thead, 
    Tbody, 
    Tr, 
    Td, 
    Th, 
    TableCellProps,
    IconButton,
    Stack
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


export interface TableRowProps extends Partial<TableCellProps>{
    value: string | number | React.ReactElement
}

export interface TableItemProps{
    rows: TableRowProps[],
    data: any
}


export interface TableActionsProps{
    onDelete: (item: TableItemProps)=> void,
    onEdit: (item: TableItemProps) => void,
    has: boolean,
    columnName?: string
}


export interface TableDefaultProps{
    body: TableItemProps[],
    header: TableRowProps[],
    actionsProps?: TableActionsProps
}


export default function TableDefault({
    body,
    header,
    actionsProps = {
        onDelete: ()=> undefined,
        onEdit: ()=> undefined,
        has: true,
        columnName: "Ações"
    }
}: TableDefaultProps){
    return (
        <TableContainer width="100%" height="100%">
            <Table 
                variant='striped' 
                color="primary"
            >
                <Thead>
                    <Tr>
                        {...header.map(item => (
                            <Th color="secondary" {...item}>
                                {item.value}
                            </Th>
                        ))}
                        {
                            actionsProps.has
                                ? (
                                    <Th textAlign="center" color="secondary">
                                        {actionsProps.columnName}
                                    </Th>
                                )
                                : undefined
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {...body.map(item => {
                        return (
                            <Tr>
                                {...item.rows.map(i => {
                                    return (
                                        <Td 
                                            color="primary"
                                            fontWeight={500}
                                            {...i}
                                        >
                                            {i.value}
                                        </Td>
                                    )
                                })}
                                {
                            actionsProps.has
                                ? (
                                    <Td>
                                        <Stack
                                            direction="row"
                                            align="center"
                                            justify="center"
                                            spacing={2}
                                            minW={100}
                                        >
                                            <IconButton
                                                color="primary"
                                                as={FaEdit}
                                                aria-label="edit"
                                                cursor="pointer"
                                                onClick={()=> actionsProps.onEdit(item)}
                                            />
                                            <IconButton
                                                color="primary"
                                                as={AiFillDelete}
                                                aria-label="delete"
                                                cursor="pointer"
                                                onClick={()=> actionsProps.onDelete(item)}
                                            />
                                        </Stack>
                                    </Td>
                                )
                                : undefined
                        }
                            </Tr>
                        )
                    })}

                </Tbody>
            </Table>
        </TableContainer>
    );
}
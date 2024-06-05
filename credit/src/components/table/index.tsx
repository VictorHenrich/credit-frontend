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
    data: any,
    id?: string | number
}


export interface TableActionsProps{
    onDelete: (item: TableItemProps)=> void,
    onEdit: (item: TableItemProps) => void,
    onClick: (item: TableItemProps) => void,
    has: boolean,
    columnName?: string
}


export interface TableDefaultProps{
    body: TableItemProps[],
    header: TableRowProps[],
    actionsProps?: TableActionsProps,
    itemSelected?: TableItemProps
}


export default function TableDefault({
    body,
    header,
    actionsProps = {
        onDelete: ()=> undefined,
        onEdit: ()=> undefined,
        onClick: ()=> undefined,
        has: true,
        columnName: "Ações"
    },
    itemSelected
}: TableDefaultProps){
    const columnStyle: React.CSSProperties = {
        backgroundColor: "rgb(220, 220, 220)",
        color: "secondary",
    }

    return (
        <TableContainer width="100%" height="100%">
            <Table>
                <Thead backgroundColor="tertiary">
                    <Tr>
                        {...header.map((item, index) => (
                            <Th 
                                color="secondary" 
                                {...item}
                                key={index}
                            >
                                {item.value}
                            </Th>
                        ))}
                        {
                            actionsProps.has
                                ? (
                                    <Th 
                                        textAlign="center" 
                                        color="secondary">
                                        {actionsProps.columnName}
                                    </Th>
                                )
                                : undefined
                        }
                    </Tr>
                </Thead>
                <Tbody backgroundColor="secondary">
                    {...body.map((item, index) => {
                        let style: React.CSSProperties = {};

                        if(itemSelected && item.id === itemSelected.id)
                            style = columnStyle;

                        return (
                            <Tr 
                                style={style}
                                cursor="pointer"
                                onClick={()=> actionsProps.onClick(item)}
                                key={index}
                            >
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
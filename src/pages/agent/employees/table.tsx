import React from "react"
import { AgentContext, AgentContextProps } from "../../../providers/agent";
import TableDefault, { TableActionsProps } from "../../../components/table";
import EmployeeEntity from "../../../entities/Employee";


export default function AgentEmployeesTable({
    onDelete,
    onEdit
}: Pick<TableActionsProps<EmployeeEntity>, "onDelete" | "onEdit">): React.ReactElement{
    const {
        employees
    }: AgentContextProps = React.useContext(AgentContext);
    
    return (
        <TableDefault
            actionsProps={{
                columnName: "Ações",
                onDelete,
                onEdit,
                has: true,
                onClick: ()=> null
            }}
            body={employees.map(item => {
                return {
                    data: item,
                    rows: [
                        {
                            value: item.name
                        },
                        {
                            value: item.documentCPF,
                        },
                        {
                            value: item.salary,
                            isNumeric: true
                        },
                        {
                            value: item.score,
                            isNumeric: true
                        }
                    ]
                }
            })}
            header={[
                {value: "Nome", textAlign: "left"},
                {value: "CPF", textAlign: "left"},
                {value: "Salário", isNumeric: true},
                {value: "Pontuação", isNumeric: true}
            ]}
        />
    )
}
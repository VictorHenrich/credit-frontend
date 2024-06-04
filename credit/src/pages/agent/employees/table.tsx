import React from "react"
import { AgentContext, AgentContextProps } from "../../../providers/agent";
import TableDefault from "../../../components/table";


export default function AgentEmployeesTable(): React.ReactElement{
    const {
        employees
    }: AgentContextProps = React.useContext(AgentContext);
    return (
        <TableDefault 
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
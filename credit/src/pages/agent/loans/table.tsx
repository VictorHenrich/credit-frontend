import React from "react";
import { AgentContext, AgentContextProps } from "../../../providers/agent";
import TableDefault from "../../../components/table";



export default function AgentLoansTable(): React.ReactElement{
    const {
        loans
    }: AgentContextProps = React.useContext(AgentContext);
    return (
        <TableDefault 
            body={loans.map(loan => {
                return {
                    data: loan,
                    rows: [
                        {
                            value: loan.description,
                            textAlign: "left"
                        },
                        {
                            value: loan.minScore,
                            isNumeric: true
                        },
                        {
                            value: loan.minSalary,
                            isNumeric: true
                        },
                        {
                            value: loan.maxInstallments,
                            isNumeric: true
                        }
                    ]
                }
            })}
            header={[
                {value: "Descrição", textAlign: "left"},
                {value: "Min. Pontuação", isNumeric: true},
                {value: "Min. Salário", isNumeric: true},
                {value: "Max. Parcelas", isNumeric: true}
            ]}
        />
    )
}
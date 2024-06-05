import React from "react";
import { AgentContext, AgentContextProps } from "../../../providers/agent";
import TableDefault, { TableActionsProps } from "../../../components/table";
import LoanEntity from "../../../entities/Loan";



export default function AgentLoansTable({
    onDelete,
    onEdit
}: Pick<TableActionsProps<LoanEntity>, "onDelete" | "onEdit">): React.ReactElement{
    const {
        loans
    }: AgentContextProps = React.useContext(AgentContext);
    return (
        <TableDefault
            actionsProps={{
                has: true,
                onDelete,
                onEdit,
                onClick: ()=> null
            }}
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
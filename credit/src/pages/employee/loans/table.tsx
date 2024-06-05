import React from "react";
import Moment from "moment";
import { EmployeeContext, EmployeeContextProps } from "../../../providers/employee";
import TableDefault from "../../../components/table";


export default function EmployeeLoansTable(): React.ReactElement{
    const {
        loans
    }: EmployeeContextProps = React.useContext(EmployeeContext);

    return (
        <TableDefault
            actionsProps={{
                has: false,
                onClick: ()=> null,
                onDelete: () => null,
                onEdit: () => null
            }}
            body={loans.map(item => {
                return {
                    data: item,
                    rows: [
                        {value: item.loan.description},
                        {
                            value: Moment(item.created).format("DD/MM/YYY"), 
                            textAlign: "center"
                        },
                        {value: item.value, isNumeric: true}
                    ]
                }
            })}

            header={[
                {value: "Empréstimo"},
                {value: "Data", textAlign: "center"},
                {value: "R$ Valor", isNumeric: true}
            ]}
        />
    )
}
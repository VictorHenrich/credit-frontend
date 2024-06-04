import EmployeeEntity from "../entities/Employee";
import api from "../utils/api";
import ServiceProps from "../utils/interfaces";




export default class EmployeeListingService implements ServiceProps<EmployeeEntity[]>{
    async execute(): Promise<EmployeeEntity[]>{
        const { data: { data: employees }} = await api.get(
            import.meta.env.VITE_EMPLOYEE_LISTING_URL
        );

        return employees;
    }
}
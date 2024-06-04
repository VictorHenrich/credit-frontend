import EmployeeEntity from "../entities/Employee";
import api from "../utils/api";
import ServiceProps from "../utils/interfaces";



export default class EmployeeCaptureService implements ServiceProps<EmployeeEntity>{
    async execute(): Promise<EmployeeEntity> {
        const { data: { data: employee } } = await api.get(import.meta.env.VITE_EMPLOYEE_CAPTURE_URL);

        return employee;
    }
}
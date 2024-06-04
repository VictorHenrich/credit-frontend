import EmployeeEntity from "../entities/Employee";
import api from "../utils/api";
import ServiceProps from "../utils/interfaces";



export default class EmployeeCaptureService implements ServiceProps<EmployeeEntity>{
    static employeeCaptureUrl: string = import.meta.env.VITE_EMPLOYEE_CAPTURE_URL;

    async execute(): Promise<EmployeeEntity> {
        const { data: employee } = await api.get(EmployeeCaptureService.employeeCaptureUrl);

        return employee;
    }
}
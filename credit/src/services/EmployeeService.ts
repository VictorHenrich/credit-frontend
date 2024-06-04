import api from "../utils/api";
import EmployeeEntity from "../entities/Employee";




export default class EmployeeService{
    static async findEmplowees(): Promise<EmployeeEntity[]>{
        const { data: { data: employees }} = await api.get(
            import.meta.env.VITE_EMPLOYEE_LISTING_URL
        );

        return employees;
    }

    static async captureAuthenticatedEmployee(): Promise<EmployeeEntity>{
        const { data: { data: employee } } = await api.get(import.meta.env.VITE_EMPLOYEE_CAPTURE_URL);

        return employee;
    }

    static async createEmployee(employee: Omit<EmployeeEntity, "uuid">): Promise<void>{
        await api.post(import.meta.env.VITE_EMPLOYEE_CREATION_URL, employee);
    }

    static async updateEmployee(employee: EmployeeEntity): Promise<void>{
        await api.put(import.meta.env.VITE_EMPLOYEE_UPDATE_URL, employee);
    }

    static async deleteEmployee(): Promise<void>{
        await api.delete(import.meta.env.VITE_EMPLOYEE_EXCLUSION_URL);
    }
}
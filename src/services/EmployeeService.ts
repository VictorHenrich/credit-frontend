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

    static async updateEmployeeByUUID(employee: EmployeeEntity): Promise<void>{
        const url: string = `${import.meta.env.VITE_EMPLOYEE_UPDATE_URL}/${employee.uuid}`;

        await api.put(url, employee);
    }

    static async updateEmployee(employee: EmployeeEntity): Promise<void>{
        await api.put(import.meta.env.VITE_EMPLOYEE_UPDATE_URL, employee);
    }

    static async deleteEmployee({ uuid }: Pick<EmployeeEntity, "uuid">): Promise<void>{
        const url: string = `${import.meta.env.VITE_EMPLOYEE_EXCLUSION_URL}/${uuid}`;

        await api.delete(url);
    }
}
import React from "react";
import { RouteObject } from "react-router-dom";

import RouterGlobalProvider from "./components/route/RouterGlobalProvider";
import HomePage from "./pages/home";
import EmployeePage from "./pages/employee";
import AgentPage from "./pages/agent";
import NotFoundPage from "./pages/notFound";
import EmployeeProfilePage from "./pages/employee/profile";
import EmployeeLoansPage from "./pages/employee/loans";
import LogoutPage from "./pages/logout";
import AgentEmployeesPage from "./pages/agent/employees";
import AgentLoansPage from "./pages/agent/loans";
import PrivateRoute from "./components/route/PrivateRoute";



const routes: RouteObject[] = [
    {
        path: "*",
        element: <NotFoundPage />
    },
    {
        path: import.meta.env.VITE_HOME_PATH,
        element: <HomePage />
    },
    {
        path: import.meta.env.VITE_LOGOUT_PATH,
        element: <LogoutPage />
    },
    {
        path: import.meta.env.VITE_AGENT_MAIN_PATH,
        element: <PrivateRoute element={<AgentPage />}/>,
        children: [
            {
                path: import.meta.env.VITE_AGENT_EMPLOYEES_PATH,
                element: <PrivateRoute element={<AgentEmployeesPage />}/>
            },
            {
                path: import.meta.env.VITE_AGENT_LOANS_PATH,
                element: <PrivateRoute element={<AgentLoansPage />}/>
            }
        ]
    },
    {
        path: import.meta.env.VITE_EMPLOYEE_MAIN_PATH,
        element: <PrivateRoute element={<EmployeePage />}/>,
        children: [
            {
                path: import.meta.env.VITE_EMPLOYEE_PROFILE_PATH,
                element: <PrivateRoute element={<EmployeeProfilePage />}/>
            },
            {
                path: import.meta.env.VITE_EMPLOYEE_LOANS_PATH,
                element: <PrivateRoute element={<EmployeeLoansPage />}/>
            }
        ]
    }
]


export default function Routes(): React.ReactElement{
    return (
        <RouterGlobalProvider routes={routes}/>
    );
}
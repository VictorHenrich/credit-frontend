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



const routes: RouteObject[] = [
    {
        path: "*",
        element: <NotFoundPage />
    },
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/logout",
        element: <LogoutPage />
    },
    {
        path: "/agent",
        element: <AgentPage />,
        children: [
            {
                path: "/agent/employees",
                element: <AgentEmployeesPage />
            },
            {
                path: "/agent/loans",
                element: <AgentLoansPage />
            }
        ]
    },
    {
        path: "/employee",
        element: <EmployeePage />,
        children: [
            {
                path: "/employee/profile",
                element: <EmployeeProfilePage />
            },
            {
                path: "/employee/loans",
                element: <EmployeeLoansPage />
            }
        ]
    }
]


export default function Routes(): React.ReactElement{
    return (
        <RouterGlobalProvider routes={routes}/>
    );
}
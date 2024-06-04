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
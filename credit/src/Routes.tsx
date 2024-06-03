import React from "react";
import { RouteObject } from "react-router-dom";

import RouterGlobalProvider from "./components/route/RouterGlobalProvider";
import HomePage from "./pages/home";
import EmployeePage from "./pages/employee";
import AgentPage from "./pages/agent";
import NotFoundPage from "./pages/notFound";



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
        path: "/agent",
        element: <AgentPage />,
    },
    {
        path: "/employee",
        element: <EmployeePage />
    }
]


export default function Routes(): React.ReactElement{
    return (
        <RouterGlobalProvider routes={routes}/>
    );
}
import React from "react";
import { RouteObject } from "react-router-dom";

import RouterGlobalProvider from "./components/routes/RouterGlobalProvider";



const routes: RouteObject[] = [

]


export default function Routes(): React.ReactElement{
    return (
        <RouterGlobalProvider routes={routes}/>
    );
}
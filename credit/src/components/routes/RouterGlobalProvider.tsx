import React from "react";

import {
    createBrowserRouter,
    RouterProvider,
    RouterProviderProps,
    RouteObject
  } from "react-router-dom";



export interface RouterGlobalProviderProps extends Partial<RouterProviderProps>{
  routes: RouteObject[]
}

export default function RouterGlobalProvider({routes, ...props}: RouterGlobalProviderProps): React.ReactElement{
  return (
    <RouterProvider 
        router={createBrowserRouter(routes)}
        { ...props }
    />
  )
}
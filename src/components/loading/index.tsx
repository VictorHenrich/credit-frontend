import React from "react";
import { Center, CenterProps } from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react'


export interface LoadingDefaultProps extends Partial<CenterProps>{
    open: boolean
}

export default function LoadingDefault({open, ...props}: LoadingDefaultProps): React.ReactElement{
    return (
        open ?
        (<Center
            position="absolute"
            backgroundColor="#000000"
            opacity={0.7}
            width="100vw"
            height="100vh"
            {...props}
        >
            <Spinner
                color="primary"
                emptyColor='secondary'
                speed='1s'
                size="xl"
                borderWidth={5}
                
            />
        </Center>)
        : <></>
    )
}
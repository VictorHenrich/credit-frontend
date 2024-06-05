import { Heading, HeadingProps } from "@chakra-ui/react";
import React from "react";




export default function HeadingDefault(props: Partial<HeadingProps> = {}): React.ReactElement{
    return (
        <Heading 
            color="secondary"
            fontSize={30}
            textAlign="left"
            fontFamily='"Open Sans", sans-serif'
            {...props}
        />
    )
}
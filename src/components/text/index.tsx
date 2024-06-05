import { Text, TextProps } from "@chakra-ui/react";
import React from "react";




export default function TextDefault(props: Partial<TextProps> = {}): React.ReactElement{
    return (
        <Text 
            color="secondary"
            fontSize={20}
            textAlign="left"
            fontFamily='"Open Sans", sans-serif'
            {...props}
        />
    )
}
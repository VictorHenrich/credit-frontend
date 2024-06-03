import React from "react";
import { Input, InputProps, InputGroup, InputRightElement, Icon } from "@chakra-ui/react";




export interface InputDefaultProps extends Partial<InputProps>{
    icon?: any
}


function InputCustom(props: Partial<InputProps>): React.ReactElement{
    return (
        <Input
            width="100%"
            padding={10}
            fontFamily="'Roboto Mono', monospace"
            borderWidth={2}
            _placeholder={{ color: "secondary", opacity: 0.5}}
            _focus={{
                borderColor: "tertiary"
            }}
            {...props}
        />
    )
}


export default function InputDefault({ icon, ...props}: InputDefaultProps = {}){
    return (
        icon ? (
            <InputGroup
                display="flex"
                width="100%"
                alignItems="center"
                position="relative"
            >
                <InputCustom
                    {...props} 
                />
                <InputRightElement 
                    position="absolute"
                    right="2%"
                    top="25%"
                >
                    <Icon 
                        as={icon}
                        color="secondary"
                        fontSize={40}
                    />
                </InputRightElement>
            </InputGroup>
        )
        :
        (<InputCustom {...props}/>)
    )
}
import React from "react";
import { Input, InputProps, InputGroup, InputRightElement, Icon, TextProps, InputGroupProps, As } from "@chakra-ui/react";
import TextDefault from "../text";



export interface InputDefaultProps extends Partial<InputProps & InputGroupProps>{
    icon?: As,
    label?: string,
    labelProps?: Partial<TextProps>,
    inputProps?: Partial<InputProps>
}


function InputCustom(props: Partial<InputProps>): React.ReactElement{
    return (
        <Input
            width="100%"
            padding={8}
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


export default function InputDefault({ icon, label, labelProps = {}, inputProps = {}, ...props}: InputDefaultProps = {}): React.ReactElement{
    return (
        <InputGroup
            alignItems="flex-start"
            position="relative"
            flexDirection="column"
            {...props}
        >
            {label ? <TextDefault marginBottom={2} {...labelProps}>{label}</TextDefault> : undefined}
            
            <InputCustom {...inputProps}/>
            
            {icon ? (
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
            ) : undefined}
        </InputGroup>
    )
}
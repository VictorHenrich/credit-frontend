import React from "react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    AlertProps,
    Slide
} from '@chakra-ui/react'


export interface AlertDefaultProps extends Partial<AlertProps>{
    open: boolean,
    title?: string
    description: string,
    timeoutInSeconds?: number,
    onClose?: () => void
}


export default function AlertDefault({ 
    title, 
    open, 
    description, 
    timeoutInSeconds = 5, 
    onClose = ()=> null,
    ...props
}: AlertDefaultProps): React.ReactElement{
    const [isOpen, setOpen] = React.useState<boolean>(open);

    React.useEffect(() =>{
        setOpen(open);

        if(!open) return;

        setTimeout(()=>{
            setOpen(false);
            onClose();
        }, 1000 * timeoutInSeconds);

    }, [open]);

    return (
        <Slide
            direction="top"
            in={isOpen}
            style={{zIndex: 10}}
        >
            <Alert 
                {...props}
                padding={10}
                fontSize={20}
            >
                <AlertIcon />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </Alert>
        </Slide>
    )
}
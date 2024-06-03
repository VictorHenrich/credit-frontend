import { Button, ButtonProps } from "@chakra-ui/react";



export default function ButtonDefault(props: ButtonProps){
    return (
        <Button 
            width="100%"
            height="45px"
            backgroundColor="secondary"
            fontFamily='"Open Sans", sans-serif'
            _hover={{
                backgroundColor: "tertiary",
                color: "secondary"
            }}
            {...props}
        />
    )
}
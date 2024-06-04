import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    ButtonProps
} from '@chakra-ui/react'
import ButtonDefault from "../button";


export interface ModalDefaultProps extends React.PropsWithChildren{
    open: boolean,
    title: string,
    onConfirm: ()=> void,
    onClose: ()=> void,
    buttonEditName?: string,
    buttonCancelName ?: string,
    buttonEditProps?: Partial<ButtonProps>,
    buttonCancelProps?: Partial<ButtonProps>
}


export default function ModalDefault({
    open,
    title,
    onConfirm,
    onClose,
    children,
    buttonEditName = "Editar",
    buttonCancelName = "Cancelar",
    buttonEditProps = {},
    buttonCancelProps = {}
}: ModalDefaultProps): React.ReactElement{
    return (
        <Modal 
            isOpen={open} 
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader color="primary" fontSize={25}>
                {title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {children}
            </ModalBody>

            <ModalFooter>
                <Stack
                    direction="row"
                    spacing={5}
                    justify="flex-end"
                    align="center"
                >
                    <ButtonDefault
                        backgroundColor="primary"
                        color="secondary"
                        onClick={onConfirm}
                        width="auto"
                        {...buttonEditProps}
                    >
                        {buttonEditName}
                    </ButtonDefault>
                    <ButtonDefault
                        backgroundColor="gray"
                        opacity={0.9}
                        color="secondary"
                        onClick={onClose}
                        width="auto"
                        {...buttonCancelProps}
                    >
                        {buttonCancelName}
                    </ButtonDefault>
                </Stack>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
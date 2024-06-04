import ModalDefault, { ModalDefaultProps } from "../../../components/modal";
import TextDefault from "../../../components/text";



export default function AgentEmployeeDialog({
    onClose,
    onConfirm,
    open
}: Pick<ModalDefaultProps, "open" | "onClose" | "onConfirm">){
   
    return (
        <ModalDefault
            onClose={onClose}
            open={open}
            onConfirm={onConfirm}
            title="Exclusão de registro"
            buttonEditName="Excluir"            
        >
            <TextDefault 
                color="black"
            >
                Você tem certeza que deseja
                {' '} excluir este registro?
            </TextDefault>
        </ModalDefault>
    )
}
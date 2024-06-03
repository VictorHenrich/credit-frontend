import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    List,
    ListItem,
    ListIcon,
  } from '@chakra-ui/react'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate, NavigateFunction } from 'react-router-dom';
import TextDefault from '../text';
import HeadingDefault from '../heading';
import ButtonDefault from '../button';




export interface ItemMenuProps{
    icon: any,
    description: string,
    id: string,
    path?: string
}

export interface MenuDefaultProps{
    itens: ItemMenuProps[],
    title?: string,
    isOpen?: boolean,
    onSelectItem?: (item: ItemMenuProps) => void
}


export default function MenuDefault({
    itens,
    title = "Menu",
    isOpen = false,
    onSelectItem = () => null
}: MenuDefaultProps){
    const [openMenu, setOpenMenu] = React.useState<boolean>(isOpen);

    const [itemSelected, setItemSelected] = React.useState<ItemMenuProps | null>(null);

    const navigator: NavigateFunction = useNavigate();

    const itemSelectStyles: React.CSSProperties = {
        backgroundColor: "primary",
        color: "secondary"
    }

    const itemDefaultStyles: React.CSSProperties = {
        color: "primary",
        backgroundColor: "secondary",
    }

    function onClick(item: ItemMenuProps): void{
        onSelectItem(item);
                                    
        setItemSelected(item);

        if(item.path)
            navigator(item.path);
    }

    return (
        <>
            <Drawer
                isOpen={openMenu}
                onClose={() => setOpenMenu(false)}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerHeader textAlign="center">
                    <HeadingDefault 
                        color="rgb(100, 100, 100)"
                        textAlign="center"
                        fontSize={20}
                    >
                        {title}
                    </HeadingDefault>
                </DrawerHeader>
                <DrawerBody>
                    <List width="100%" borderRadius={10} overflow="hidden">
                        {...itens.map((item) => {
                            return (
                                <ListItem
                                    width="100%"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    onClick={()=> onClick(item)}
                                    transition="all 0.5s"
                                    borderBottom="2px solid"
                                    borderColor="primary"
                                    padding="20px 5px"
                                    cursor="pointer"
                                    fontSize={35}
                                    _hover={itemSelectStyles}
                                    color="primary"
                                    backgroundColor="secondary"
                                    style={itemSelected?.id === item.id ? itemSelectStyles : itemDefaultStyles}
                                >
                                    <TextDefault color="inherit">{item.description}</TextDefault>
                                    {
                                        item.icon && <ListIcon fontSize="inherit" color="inherit" as={item.icon}/>
                                    }
                                </ListItem>
                            )
                        })}
                    </List>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
            
            <ButtonDefault
                position="fixed"
                top={10}
                left={20}
                width={20}
                height={20}
                borderRadius="100%"
                as={AiOutlineMenuUnfold}
                onClick={() => setOpenMenu(true)}
            />
        </>
    )
}
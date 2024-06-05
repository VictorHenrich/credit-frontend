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
    As,
    DrawerCloseButton,
    ListItemProps,
  } from '@chakra-ui/react'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate, NavigateFunction } from 'react-router-dom';
import TextDefault from '../text';
import HeadingDefault from '../heading';
import ButtonDefault from '../button';
import { menuStore, setItemSelected } from '../../redux/menu';




export interface ItemMenuProps{
    icon: As,
    description: string,
    id: string,
    path?: string
}

export interface MenuDefaultProps{
    itens: ItemMenuProps[],
    title?: string,
    isOpen?: boolean,
    onSelectItem?: (item: ItemMenuProps) => void,
    initialItemSelected?: ItemMenuProps
}


export default function MenuDefault({
    itens,
    title = "Menu",
    isOpen = false,
    onSelectItem = () => null,
    initialItemSelected
}: MenuDefaultProps){
    const { itemSelected } = menuStore.getState();

    const [openMenu, setOpenMenu] = React.useState<boolean>(isOpen);

    const navigator: NavigateFunction = useNavigate();

    const itemSelectStyles: ListItemProps = {
        backgroundColor: "primary",
        color: "secondary"
    }

    const itemDefaultStyles: ListItemProps = {
        backgroundColor: "secondary",
        color: "primary"
    }

    function onClick(item: ItemMenuProps): void{
        menuStore.dispatch(setItemSelected(item));

        onSelectItem(item);

        if(item.path)
            navigator(item.path);
    }

    React.useEffect(()=> {
        if(initialItemSelected)
            menuStore.dispatch(setItemSelected(initialItemSelected));
    }, [initialItemSelected]);

    return (
        <>
            <Drawer
                isOpen={openMenu}
                onClose={() => setOpenMenu(false)}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
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
                            let style: ListItemProps = itemDefaultStyles;

                            if(itemSelected && item.id === itemSelected.id)
                                style = itemSelectStyles;

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
                                    {...style}
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
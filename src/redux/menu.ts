import { createSlice, configureStore } from '@reduxjs/toolkit';
import { ItemMenuProps } from "../components/menu";



export interface MenuSliceProps{
    itemSelected?: ItemMenuProps
}

const initialState: MenuSliceProps = {
    itemSelected: undefined
}


export const menuSlice = createSlice({
    name: 'menu',
    initialState: initialState,
    reducers: {
        setItemSelected: (state: MenuSliceProps, { payload })=> {
            state.itemSelected = payload;
        }
    }
});


export const { setItemSelected } = menuSlice.actions;

export const menuStore = configureStore({
    reducer: menuSlice.reducer
})
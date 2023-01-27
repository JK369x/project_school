import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Lookup } from '../../types/type'
// import type { RootState } from "../../app/store";
import { RootState } from '../store'



export interface ButtonCheck {
    statusbtn?: boolean

}

// Define the initial state using that type
const initialState: ButtonCheck = {}

export const btnStore = createSlice({
    name: 'btnStatus',
    initialState,
    reducers: {
        //! เป็น type ของ action 
        setbtnStore: (state, { payload: { statusbtn } }: PayloadAction<ButtonCheck>) => {
            state.statusbtn = statusbtn
        },
        clearbtnStore: (state) => {
            delete state.statusbtn
        },
    },
})

export const { setbtnStore, clearbtnStore } = btnStore.actions

// Other code such as selectors can use the imported `RootState` type
// export const auth = (state: RootState) => {
// 	return state.auth
// }

export default btnStore.reducer
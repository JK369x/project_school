import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:'hello'
}

export const userSilice = createSlice({
    name:'userStroe',
    initialState:initialState,
    reducers:{
        login:(state)=>{
            state.value='hello world'
        },
        logout:(state)=>{
            state.value='logout'
        }
    }
})

export const {login,logout} = userSilice.actions

export default userSilice.reducer
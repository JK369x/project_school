import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Lookup } from '../../types/type'
// import type { RootState } from "../../app/store";
import { RootState } from '../store'



export interface Course {
    uid_course?: string[] | null

}

// Define the initial state using that type
const initialState: Course = {}

export const courseStore = createSlice({
    name: 'course',
    initialState,
    reducers: {
        //! เป็น type ของ action 
        setCourseStore: (state, { payload: { uid_course } }: PayloadAction<Course>) => {
            state.uid_course = uid_course

        },

        clearCourseStore: (state) => {
            delete state.uid_course


        },
    },
})

export const { setCourseStore, clearCourseStore } = courseStore.actions

// Other code such as selectors can use the imported `RootState` type
// export const auth = (state: RootState) => {
// 	return state.auth
// }

export default courseStore.reducer
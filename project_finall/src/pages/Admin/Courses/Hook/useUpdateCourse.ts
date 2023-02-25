import axios from "axios"
import { CourseListsType } from "./useGetCourse"
import { useAppDispatch } from "../../../../store/useHooksStore"
import { openAlertError, openAlertSuccess } from "../../../../store/slices/alertSlice"
import { isCloseLoading, isShowLoading } from "../../../../store/slices/loadingSlice"

export const useUpdateCourse = () => {
    const dispatch = useAppDispatch()
    const updateCourse = async (params: CourseListsType, id: string) => {
        try {
            dispatch(isShowLoading())
            const url = `${import.meta.env.VITE_REACT_APP_API}course/updatecourse/${id}`
            try {
                axios.defaults.withCredentials = true
                await axios.put(url, params)
                dispatch(openAlertSuccess('Update Course Success !!'))
                return true
            } catch (err) {
                console.log(err)
                dispatch(openAlertError('Error Update Course !!'))
                return false
            }
        } catch (error) {
            console.log("🚀 ~ file: useUpdateCourse.ts:26 ~ updateCourse ~ error:", error)
        } finally {
            dispatch(isCloseLoading())
        }
    }
    return { updateCourse }
}
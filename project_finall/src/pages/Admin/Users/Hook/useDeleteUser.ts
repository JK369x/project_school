import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/config_firebase";
import { AccountCollection, CourseCollection, CategoryCollection } from "../../../../firebase/createCollection";


// store
import { useAppDispatch } from '../../../../store/useHooksStore'
import { isShowLoading, isCloseLoading } from '../../../../store/slices/loadingSlice'
import axios from "axios";



// design Ledger ให้ใช้ร่วมกันหลายคนได้ด้วย *****
export const useDeleteUser = () => {
    const dispatch = useAppDispatch();
    const deleteUser = async (id: string) => {
        try {
            dispatch(isShowLoading());
            const url = `${import.meta.env.VITE_REACT_APP_API}user/deleteuser/${id}`
            axios.defaults.withCredentials = true
            await axios.delete(url)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            dispatch(isCloseLoading());
        }
    };

    return { deleteUser };
};


// export const useDeleteCourse = () => {
//     const dispatch = useAppDispatch();
//     const deleteCourse = async (id: string) => {
//         try {
//             dispatch(isShowLoading());
//             await deleteDoc(doc(CourseCollection, id));
//             return true;
//         } catch (error) {
//             console.log(error);
//             return false;
//         } finally {
//             dispatch(isCloseLoading());
//         }
//     };

//     return { deleteCourse };
// };



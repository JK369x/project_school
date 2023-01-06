import { db } from '../../firebase/config_firebase';
import { addDoc, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { AccountCollection, CourseCollection } from '../../firebase/createCollection'


export const useUpdateApproval= async (id:string) => {
        try {
            await updateDoc(doc(CourseCollection, id), {
                approval: true
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
}
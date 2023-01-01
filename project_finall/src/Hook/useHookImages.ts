import {
    deleteObject,
    getDownloadURL,
    listAll,
    ref, uploadBytesResumable,
} from "firebase/storage"
import { storage } from '../firebase/config_firebase'
import { useAppDispatch, useAppSelector } from '../store/useHooksStore'
import { CourseCollection } from '../firebase/createCollection'
import { TypeCourses } from './course/useCreateCourse'
import { UseCreateCourse } from './course/useCreateCourse'
import { isCloseLoading, isShowLoading } from '../store/slices/loadingSlice'
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react"
// import {image} from '../pages/Admin/Courses/AddCourse'



export const useHookImages = () => {
    const [imageURL, setImageURL] = useState<any>(null);
    const dispatch = useAppDispatch()





    // const imageRef = ref(storage, `img/${image.name}`)
    // const uploadFile = uploadBytesResumable(imageRef, image);
    // const HookgetDownLoadURL = getDownloadURL(imageRef).then((url) => {
    //     setImageURL(url)
    //     console.log("🚀 ~ file: AddCourse.tsx:96 ~ AddCourse ~ imageURL", imageURL)
    // }).catch((error) => {
    //     console.log("🚀 ~ file: AddCourse.tsx:121 ~ getDownloadURL ~ error", error)
    // });


    // const uploadFileSnapshot = uploadFile.on('state_changed', (snapshot) => {
    //     }, (err) => {
    //         throw (err)
    //     }, () => {
    //         alert("File uploaded Successfully :)👌")
    //     });
}
import React, { FC, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Nextregistor from "../pages/Nextregistor";
import Testgrid from "../pages/test/Testgrid";
import LoginAdmin from "../pages/Admin/LoginAdmin";
import User from "../pages/Admin/Users/User";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import DetailUser from "../pages/Admin/Users/DetailUser";
import EditUser from "../pages/Admin/Users/EditUser";
import Course from "../pages/Admin/Courses/Couse";
import AddCourse from "../pages/Admin/Courses/AddCourse";
import Page from "../pages/page";
import Category from "../pages/Admin/Categorys/Category";
import AddCategory from "../pages/Admin/Categorys/AddCategory";
import Registor from "../pages/Register";
import { useAppDispatch, useAppSelector } from "../store/useHooksStore";
import PageHome from "../pages/PageHome";
import { onAuthStateChanged } from "firebase/auth";
import { setAuthStore } from "../store/slices/authSlice";
import { auth } from "../firebase/config_firebase";
import { doc, getDoc } from "firebase/firestore";
import { AccountCollection } from "../firebase/createCollection";
import Approval from "../pages/Admin/Approval/Approval";
import DetailCourse from "../pages/Admin/Courses/DetailCourse";
import EditCourse from "../pages/Admin/Courses/EditCourse";
import CategoryCourse from "../pages/CategoryCourse";
import RegisterTeacher from "../pages/Admin/RegisterTeacher";
import Teacher from "../pages/Admin/Teacher/Teacher";
import Favorite from "../pages/Favorite";
import DetailCourseHomePage from "../pages/DetailCourseHomePage";
import { middleware } from "../middleware/middleware";
import axios from "axios";
import EditCategory from "../pages/Admin/Categorys/EditCategory";
import DetailCategory from "../pages/Admin/Categorys/DetailCtegory";




const RouteAllPage: FC = () => {

    const { email, status, photoURL, favorite } = useAppSelector(({ auth }) => auth)
    const auth_uid = email !== undefined && email !== null


    const dispatch = useAppDispatch()

    useEffect(() => {
        autoSignIn()
    }, [])
    const autoSignIn = async () => {
        console.log('autosme ')
        const url = `${import.meta.env.VITE_REACT_APP_API}auth/me`
        axios.defaults.withCredentials = true
        try {
            const autoSignIn = await axios.get(url)
            const data = autoSignIn.data.payload
            console.log("🚀 ~ file: routes.tsx:61 ~ autoSignIn ~ data", data)
            console.log('================== email', data.email)
            dispatch(setAuthStore({
                uid: data.id_document,
                email: data.email,
                displayName: data.display_name,
                status: data.status,
                favorite: []
            }))
        } catch (err) {
            console.log("🚀 ~ filse: middleware.ts:18 ~ autoSignIn ~ err", err)

        }
        console.log("🚀===================")
    }



    return (
        <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/page" element={<PageHome />} />
            <Route path="/adminlogin" element={<LoginAdmin />} />
            <Route path="/registerteacher" element={<RegisterTeacher />} />
            <Route path="/registor" element={<Registor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editcategory/:id" element={<EditCategory />} />
            <Route path="/detailcategory/:id" element={<DetailCategory />} />
            <Route path="/detailcoursehomepage/:id" element={<DetailCourseHomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/nextregistor" element={<Nextregistor />} />
            <Route path="/testgrid" element={<Testgrid />} />
            <Route path="/users" element={<User />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detailuser/:id" element={<DetailUser />} />
            <Route path="/editUser/:id" element={<EditUser />} />
            <Route path="/detailcourse/:id" element={<DetailCourse />} />
            <Route path="/editcourse/:id" element={<EditCourse />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/addcourses" element={<AddCourse />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/category" element={<Category />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/approval" element={<Approval />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/category_course" element={<CategoryCourse />} />


            <Route
                path="*"
                element={<>{email === null ? <NotFoundPage /> : null}</>}
            />
        </Routes>
    )
}


const NotFoundPage: FC = () => {
    return (
        <h2>Error 404 : Not Found Page</h2>
    )
}

export default RouteAllPage
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
import DetailUser from "../pages/Admin/Users/detailuser/DetailUser";
import EditUser from "../pages/Admin/Users/edituser/EditUser";
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





const RouteAllPage: FC = () => {
    const { uid, status, displayName } = useAppSelector(({ auth }) => auth)
    console.log("🚀 ~ file: routes.tsx:32 ~ status", status)
    const auth_uid = uid !== undefined && uid !== null



    const dispatch = useAppDispatch()
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docSnap = await getDoc(doc(AccountCollection, user.uid))
                if (docSnap && docSnap.exists()) {
                    const { firstName, lastName, photoURL, status } = docSnap.data() as any
                    const displayName = `${firstName} ${lastName}`
                    dispatch(
                        setAuthStore({
                            uid: user.uid,
                            displayName: displayName,
                            status: status,
                            // photoURL: user.photoURL as any,
                        }),
                    )
                }
            } else {
                dispatch(
                    setAuthStore({
                        uid: null,
                        displayName: null,
                        photoURL: null,
                    }),
                )
            }

        })
    }, [])
    return (
        <Routes>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<LoginAdmin />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/registor" element={<Registor />} />
            <Route path="/nextregistor" element={<Nextregistor />} />
            <Route path="/testgrid" element={<Testgrid />} />
            <Route path="/users" element={<User />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detailuser/:id" element={<DetailUser />} />
            <Route path="/editUser/:id" element={<EditUser />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/addcourses" element={<AddCourse />} />
            <Route path="/page" element={<PageHome />} />
            <Route path="/category" element={<Category />} />
            <Route path="/addcategory" element={<AddCategory />} /> */}
            <Route path="/" element={<PageHome />} />
            <Route path="/page" element={<PageHome />} />
            <Route path="/adminlogin" element={<LoginAdmin />} />
            <Route path="/registerteacher" element={<RegisterTeacher />} />
            <Route path="/registor" element={<Registor />} />
            <Route path="/login" element={<Login />} />
            {!auth_uid ? (
                <>

                    {status?.label === 'admin' ? (
                        <>

                        </>) : (
                        <>

                        </>
                    )}

                </>
            ) : (
                <>

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

                    <Route path="/category" element={<Category />} />
                    <Route path="/addcategory" element={<AddCategory />} />
                    <Route path="/approval" element={<Approval />} />
                    <Route path="/category_course" element={<CategoryCourse />} />
                </>
            )}
            <Route
                path="*"
                element={<>{uid === null ? <NotFoundPage /> : null}</>}
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
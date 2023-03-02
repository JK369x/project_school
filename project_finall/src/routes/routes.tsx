import React, { FC, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Category from "../pages/Admin/Categorys/Category";
import AddCategory from "../pages/Admin/Categorys/AddCategory";
import Registor from "../pages/Register";
import { useAppDispatch, useAppSelector } from "../store/useHooksStore";
import PageHome from "../pages/PageHome";
import { setAuthStore } from "../store/slices/authSlice";

import Approval from "../pages/Admin/Approval/Approval";
import DetailCourse from "../pages/Admin/Courses/DetailCourse";
import EditCourse from "../pages/Admin/Courses/EditCourse";
import CategoryCourse from "../pages/CategoryCourse";
import RegisterTeacher from "../pages/Admin/RegisterTeacher";
import Teacher from "../pages/Admin/Teacher/Teacher";
import Favorite from "../pages/Favorite";
import DetailCourseHomePage from "../pages/DetailCourseHomePage";
import axios from "axios";
import EditCategory from "../pages/Admin/Categorys/EditCategory";
import DetailCategory from "../pages/Admin/Categorys/DetailCtegory";
import { setCourseStore } from "../store/slices/courseSlice";
import CheckName from "../pages/Admin/Checkname/CheckName";
import ViewUserJoinCourse from "../pages/Admin/Courses/ViewUserJoinCourse";
import Quiz from "../pages/Admin/Quiz/Quiz";
import AddTeacher from "../pages/Teacher/RegisterTeacher";
import Profile from "../pages/Admin/Users/Profile";
import ShowQuiz from "../pages/Admin/Quiz/ShowQuiz";
import DetailQuiz from "../pages/Admin/Quiz/DetailQuiz";
import QuestionCard from "../pages/Admin/Quiz/QuestionCard";
import SimpleAccordion from "../pages/Admin/Quiz/Accordion";
import AllTeacher from "../pages/AllTeacher";
import DetailTeacher from "../pages/DetailTeacher";
import UploadReceipt from "../pages/UploadReceipt";
import CommentCourse from "../pages/Admin/Comment/CommentCourse";
import ViewAllComment from "../pages/Admin/Comment/ViewAllComment";
import ViewAllNameCheck from "../pages/Admin/Checkname/ViewAllNameCheck";
import ViewDetailUserInCourse from "../pages/Admin/Checkname/ViewDetailUserInCourse";
import Pdftest from "../pages/test/Pdftes";
import ChartUserQuiz from "../pages/Admin/Chart/ChartUserQuiz";
import ResetPassword from "../pages/Admin/Users/ResetPassword";
import ReplyComment from "../pages/Admin/Comment/ReplyComment";
import Contacts from "../pages/Contacts";
import Banner from "../pages/Admin/Banner/Banner";
import ProFileUserFontEnd from "../pages/ProFileUserFontEnd";
import EditProfileUser from "../pages/EditProfileUser";
import Calculate from "../pages/Admin/Calculate";
import HomeView from "../pages/test/Views";
import ReceiptUser from "../pages/ReceiptUser";
import LoginSuccess from "../pages/LoginSuccess";
import Certificate from "../pages/Certificate/Certifacate";



const RouteAllPage: FC = () => {

    const { email, status, photoURL, favorite, about, uid } = useAppSelector(({ auth }) => auth)

    const auth_uid = uid !== undefined && uid !== null


    const dispatch = useAppDispatch()

    useEffect(() => {
        autoSignIn()
    }, [])

    const autoSignIn = async () => {
        console.log('============ send token ====================')
        const url = `${import.meta.env.VITE_REACT_APP_API}auth/me`
        axios.defaults.withCredentials = true
        try {
            const autoSignIn = await axios.get(url)
            console.log("🚀 ~ file: routes.tsx:59 ~ autoSignIn ~ autoSignIn", autoSignIn)
            const data = autoSignIn.data.user.payload.image_rul
            const user_data = autoSignIn.data.data_new
            const new_favorite = user_data.favorite
            const new_email = user_data.email
            const new_join = user_data.course_join
            const new_status = user_data.status
            console.log("🚀 ~ file: routes.tsx:88 ~ autoSignIn ~ new_status:", new_status)
            const firstName = user_data.firstName
            const lastName = user_data.lastName
            const new_id_document = user_data.id_document
            const user_about = user_data.about
            const displayName = `${firstName} ${lastName}`
            dispatch(setAuthStore({
                uid: new_id_document,
                email: new_email,
                displayName,
                status: new_status,
                favorite: new_favorite,
                photoURL: data,
                about: user_about,
            }))
            dispatch(setCourseStore({
                uid_course: new_join,

            }),
            )

        } catch (err) {
            console.log("🚀 ~ filse: middleware.ts:18 ~ autoSignIn ~ err", err)
            return false

        }

    }



    return (
        <Routes>
            {!auth_uid ? (
                <>
                //!admin
                    <Route path="/adminlogin" element={<LoginAdmin />} />
                //*user
                    <Route path="/" element={<PageHome />} />
                    <Route path="/registor" element={<Registor />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/category_course" element={<CategoryCourse />} />
                    <Route path="/teacheralllist" element={<AllTeacher />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/detailtecher/:id" element={<DetailTeacher />} />
                    <Route path="/detailcoursehomepage/:id" element={<DetailCourseHomePage />} />
                    <Route path="/loginsuccess" element={<LoginSuccess />} />
                </>)

                :

                (<>
                    {status?.id === '4' && (<>
                        <Route path="/registerteacher" element={<RegisterTeacher />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<User />} />
                        <Route path="/teacher" element={<Teacher />} />
                        <Route path="/courses" element={<Course />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/addcategory" element={<AddCategory />} />
                        <Route path="/calculate" element={<Calculate />} />
                        <Route path="/banner" element={<Banner />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/resetpassword/:id" element={<ResetPassword />} />
                        <Route path="/editcourse/:id" element={<EditCourse />} />
                        <Route path="/addcourses" element={<AddCourse />} />
                        <Route path="/viewuserjoincourse/:id" element={<ViewUserJoinCourse />} />
                        <Route path="/replycomment/:id_course/:id_comment" element={<ReplyComment />} />
                        <Route path="/createteacher" element={<AddTeacher />} />
                        <Route path="/quiz/:id" element={<Quiz />} />
                        <Route path="/detailquiz/:id/:id_quiz" element={<DetailQuiz />} />
                        <Route path="/viewallcomment/:id" element={<ViewAllComment />} />
                        <Route path="/viewnamecheck/:id" element={<ViewAllNameCheck />} />
                        <Route path="/viewdetailuserincourse/:id_user/:id_course" element={<ViewDetailUserInCourse />} />
                    </>)}
                    {status?.id === '10' && (<>
                        <Route path="/registerteacher" element={<RegisterTeacher />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<User />} />
                        <Route path="/teacher" element={<Teacher />} />
                        <Route path="/courses" element={<Course />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/addcategory" element={<AddCategory />} />
                        <Route path="/calculate" element={<Calculate />} />
                        <Route path="/banner" element={<Banner />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/resetpassword/:id" element={<ResetPassword />} />
                        <Route path="/editcourse/:id" element={<EditCourse />} />
                        <Route path="/addcourses" element={<AddCourse />} />
                        <Route path="/viewuserjoincourse/:id" element={<ViewUserJoinCourse />} />
                        <Route path="/replycomment/:id_course/:id_comment" element={<ReplyComment />} />
                        <Route path="/createteacher" element={<AddTeacher />} />
                        <Route path="/quiz/:id" element={<Quiz />} />
                        <Route path="/detailquiz/:id/:id_quiz" element={<DetailQuiz />} />
                        <Route path="/viewallcomment/:id" element={<ViewAllComment />} />
                        <Route path="/viewnamecheck/:id" element={<ViewAllNameCheck />} />
                        <Route path="/viewdetailuserincourse/:id_user/:id_course" element={<ViewDetailUserInCourse />} />
                        <Route path="/approval" element={<Approval />} />
                    </>)}
                //!admin
                    //*user
                    <Route path="/" element={<PageHome />} />
                    <Route path="/favorite" element={<Favorite />} />
                    <Route path="/editcategory/:id" element={<EditCategory />} />
                    <Route path="/detailcategory/:id" element={<DetailCategory />} />
                    <Route path="/detailcoursehomepage/:id" element={<DetailCourseHomePage />} />
                    <Route path="/detailuser/:id" element={<DetailUser />} />
                    <Route path="/profiledetailuser_user/:id" element={<ProFileUserFontEnd />} />
                    <Route path="/editUser/:id" element={<EditUser />} />
                    <Route path="/detailcourse/:id" element={<DetailCourse />} />
                    <Route path="/showquiz/:id/:id_quiz" element={<ShowQuiz />} />
                    <Route path="/category_course" element={<CategoryCourse />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/teacheralllist" element={<AllTeacher />} />
                    <Route path="/quizuser/:id_course/:id_quiz" element={<QuestionCard />} />
                    <Route path="/detailtecher/:id" element={<DetailTeacher />} />
                    <Route path="/useuploadreceipt" element={<UploadReceipt />} />
                    <Route path="/usereditprofile/:id" element={<EditProfileUser />} />
                    <Route path="/viewpdf/:id_user/:id_document" element={<HomeView />} />
                    <Route path="/requestreceipt/:id" element={<ReceiptUser />} />
                    <Route path="/certificate/:id" element={<Certificate />} />
                    {/* <Route path="/checkname" element={<CheckName />} />
                    <Route path="/comment" element={<CommentCourse />} /> */}
                    {/* <Route path="/accordion" element={<SimpleAccordion />} /> */}
               //?test
                    <Route path="/testgrid" element={<Testgrid />} />
                    <Route path="/pdftest" element={<Pdftest />} />
                </>)
            }
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
import React from "react";

import { ThemeProvider, CssBaseline } from "@mui/material";
import ThemeLight from "./framework/theme/ThemeLight";
import ThemeDark from "./framework/theme/ThemeDark";

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
// import Testgrid from './pages/test/Testgrid'

import Nextregistor from './pages/Nextregistor'
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Registor from "./pages/Register";
import Testgrid from "./pages/test/Testgrid";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import User from "./pages/Admin/Users/User";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Alert from "./framework/control/Alert/Alert";
import {Dialog}  from "./framework/control/Dialog/Dialog";
import Loading from "./framework/control/Loading/Loading";
import DetailUser from './pages/Admin/Users/detailuser/DetailUser'
import EditUser from "./pages/Admin/Users/edituser/EditUser";
import Course from "./pages/Admin/Courses/Couse";
import AddCourse from "./pages/Admin/Courses/AddCourse";


import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Page from "./pages/page";

type Props = {};

export default function App({ }: Props) {
  return (

    <ThemeProvider theme={ThemeLight}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <CssBaseline/>
      <Dialog />
      <Loading />
      <Alert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/registor" element={<Registor />} />
        <Route path="/nextregistor" element={<Nextregistor />} />
        <Route path="/testgrid" element={<Testgrid />} />
        <Route path="/adminlogin" element={<LoginAdmin />} />
        <Route path="/users" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detailuser/:id" element={<DetailUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/addcourses" element={<AddCourse />} />
        <Route path="/page" element={<Page />} />
      </Routes>
      </LocalizationProvider>
    </ThemeProvider>

  );
}
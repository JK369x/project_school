import React from "react";
import { useSelector } from "react-redux";

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Routes, Route} from 'react-router-dom';
import "./App.css";



type Props = {};

export default function App({}: Props) {
  return (
    <Routes>
     
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
     

    </Routes>
  );
}
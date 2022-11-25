import React from "react";
import { useSelector } from "react-redux";

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Nextregistor from './pages/Nextregistor'
import { Routes, Route} from 'react-router-dom';
import "./App.css";
import Registor from "./pages/Registor";



type Props = {};

export default function App({}: Props) {
  return (
    <Routes>
     
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/registor" element={<Registor/>} />
        <Route path="/nextregistor" element={<Nextregistor/>} /> 

    </Routes>
  );
}
import React from "react";
import { useSelector } from "react-redux";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Routes, Route} from 'react-router-dom';
import "./App.css";

import { counter1Selector } from "./store/slices/counter1Slice";
import { counter2Selector } from "./store/slices/counter2Slice";

type Props = {};

export default function App({}: Props) {
  const counter1Reducer = useSelector(counter1Selector);
  const counter2Reducer = useSelector(counter2Selector);

  return (
    <Routes>
     
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
     

    </Routes>
  );
}
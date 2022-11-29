import React from "react";
import { useSelector } from "react-redux";

import { ThemeProvider, CssBaseline } from "@mui/material";
import ThemeLight from "./framework/theme/ThemeLight";
import ThemeDark from "./framework/theme/ThemeDark";

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Nextregistor from './pages/Nextregistor'
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Registor from "./pages/Register";



type Props = {};

export default function App({ }: Props) {
  return (

    <ThemeProvider theme={ThemeLight}>
      <CssBaseline/>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/registor" element={<Registor />} />
        <Route path="/nextregistor" element={<Nextregistor />} />

      </Routes>
    </ThemeProvider>
  );
}
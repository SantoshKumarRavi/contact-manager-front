// import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./component/Loginpage.jsx";
import Registrationpage from "./component/RegistrationPage.jsx";
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />}></Route>
          <Route path="/register" element={<Registrationpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;
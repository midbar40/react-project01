import React from "react";
import { Route, Routes } from "react-router-dom";
import  Main  from "./pages/Main"; // import { Main } from "./pages는 왜 안되었던 걸까?
import './styles/index.css';
import {CheckScore, Login, Mypage, Signup} from "./pages/index";

const App : React.FC = () => {
  return (
      <Routes>
        <Route path='/' element={<Main />} />      
        <Route path='/checkscore' element={<CheckScore />} />      
        <Route path='/login' element={<Login />} />      
        <Route path='/mypage' element={<Mypage />} />      
        <Route path='/signup' element={<Signup />} />      
      </Routes>   
  );
};
export default App;
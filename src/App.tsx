import React from "react";
import { Route, Routes } from "react-router-dom";
import  Main  from "./pages/Main"; // import { Main } from "./pages는 왜 안되었던 걸까?
import './styles/index.css';
import CheckScore from "./pages/CheckScore";

const App : React.FC = () => {
  return (
      <Routes>
        <Route path='/' element={<Main />} />      
        <Route path='/checkscore' element={<CheckScore />} />      
      </Routes>   
  );
};
export default App;
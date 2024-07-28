import React from "react";
import { Route, Routes } from "react-router-dom";
import {AdminLogin, AdminSignup, DashBoard} from "./pages/index"

const AdminApp: React.FC = () => {
    return(
        <Routes>
            <Route path='/adminlogin' element={<AdminLogin />}/>
            <Route path='/adminsignup' element={<AdminSignup/>}/>
            <Route path='/admindashboard' element={<DashBoard/>}/>
        </Routes>
    )
}

export default AdminApp;
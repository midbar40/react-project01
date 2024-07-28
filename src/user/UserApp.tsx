import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import './styles/userIndex.css';
import Header from "./components/Header";
import { Main, CheckScore, Login, Mypage, Signup } from "./pages/index";
import { useAuthStore } from '../common/stores/AuthStore';

const App: React.FC = () => {
  const { cookies, setCookies, clearCookies } = useAuthStore();

  // accessToken 로그인 상태 확인 
  const fetchCheckLogin = async () => {
    const response = await fetch("http://localhost:5000/api/users/check-login", {
      method: 'GET',
      headers: { 'Content=Type': 'application/json' },
      credentials: 'include'
    })
    const result = await response.json()
    return result.isLoggedIn
  }

  // refreshToken 확인
  useEffect(() => {
    try {
      const fetchRefresh = async () => {
        const response = await fetch("http://localhost:5000/api/users/refres-token", {
          method: 'GET',
          headers: { 'Content=Type': 'application/json' },
          credentials: 'include'
        })
        const result = await response.json()
        if (result.refreshIsValid) { // refreshToken이 있는 경우
          const accessToken = await fetchCheckLogin();
          if (accessToken) { // accessToken이 있는 경우
            setCookies('userVerified');
          } else { // accessToken이 없는 경우
            clearCookies();
          }
        } else { // refreshToken이 없는 경우
          window.location.href = '/login'
        }
      }
    } catch (error) {
      console.log("refreshToken 확인 error :", error)
    }
  }, [])


  return (
    <div className='main'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/checkscore' element={<CheckScore />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
};
export default App;
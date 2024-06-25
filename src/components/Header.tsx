import React from 'react'; // react를 import하지 않으면 typescript에서 html을 인식하지 못함
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
// import {useAuthStore} from '../stores/AuthStore';
// import Cookies from 'js-cookie';

const Header:React.FC = () => {
    // const { cookies, clearCookies } = useAuthStore();
    // console.log('쿠키 상태 :', cookies)
    let navigate = useNavigate();
    const logout = () => {
        // clearCookies();
        // Cookies.remove('midbar_token');
        navigate('/');
    }
    return (
        <header>
            <div className='mainHeader'>
                <nav>
                    <div className='mainHeader_logo'>
                        <NavLink to="/" className="nav_link">
                            <img src={require("../assets/imgs/brandLogo.png").default} alt="mainHeader_logoImg" />
                        </NavLink>
                    </div>
                    <div className="mainHeader_link">
                        <NavLink to="/service" className="nav_link">서비스소개</NavLink>
                        <NavLink to="/myPage" className="nav_link">마이페이지</NavLink>
                    {/* {  
                    cookies ? <a onClick={logout}>로그아웃</a> 
                    :   */}
                    <NavLink to="/login" className="nav_link">로그인</NavLink>
                     {/* } */}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
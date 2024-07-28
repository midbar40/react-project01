import React from 'react'; // react를 import하지 않으면 typescript에서 html을 인식하지 못함
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../common/stores/AuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import '../styles/Header.css';


// 서버에 로그아웃 요청
const fetchLogout = async (): Promise<void> => {
    const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    })
    const result = await response.json();
    console.log('로그아웃 결과 :', result.message)
}

const Header: React.FC = () => {
    let navigate = useNavigate();
    const queryClient = useQueryClient();
    const { cookies, clearCookies } = useAuthStore();
    const { mutate } = useMutation({
        mutationFn: fetchLogout,
        onSuccess: () => {
            clearCookies();
            queryClient.invalidateQueries({ // 캐시가 안지워지고 있음
                queryKey: ["userInfo"],
            });
            const data = queryClient.getQueryData(["userInfo"])
            console.log('로그아웃 후 캐쉬데이터 :', data)
            navigate('/');
            window.location.reload();
        }
    })
    return (
        <header>
            <div className='mainHeader'>
                <nav>
                    <div className='mainHeader_logo'>
                        <NavLink to="/" className="nav_link">
                            <img src={require("../../assets/imgs/brandLogo.png").default} alt="mainHeader_logoImg" />
                        </NavLink>
                    </div>
                    <div className="mainHeader_link">
                        <NavLink to="/service" className="nav_link">서비스소개</NavLink>
                        {cookies && <NavLink to="/myPage" className="nav_link">마이페이지</NavLink>}
                        {
                            cookies ? <a onClick={() => mutate()} className="nav_link logoutBtn">로그아웃</a>
                                :
                                <NavLink to="/login" className="nav_link loginBtn" >로그인</NavLink>
                        }
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
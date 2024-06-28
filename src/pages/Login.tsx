import React, {useEffect, useState} from 'react';
import { LoginForm } from '../components';
import { useNavigate } from 'react-router-dom';
import {useAuthStore} from '../stores/AuthStore';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
    const [loginAuth, setLoginAuth] = useState<boolean>(false);
    const setCookies = useAuthStore(state => state.setCookies);
    let navigate = useNavigate();
    useEffect(() => {
        if (loginAuth) {
            window.localStorage.removeItem('email')
            navigate('/');
        }
    }, [loginAuth, navigate]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/users/events', 
        {
            withCredentials: true
        }
        );
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('로그인 이벤트 :', data);
            if (data.message === 'user_verified') {
                if(data.cookieToken !== undefined) {
                    let token = Cookies.set('isLoggined', 'accepted', {expires: 1});
                    setLoginAuth(true);
                    setCookies(token as string);
                    console.log('Login쿠키 :', token)
                }
                eventSource.close();
            }
        };
        return () => eventSource.close();
    }, []);

    return (
        <>
                <LoginForm loginAuth={loginAuth} setLoginAuth={setLoginAuth}/>
        </>
    )
}

export default Login;
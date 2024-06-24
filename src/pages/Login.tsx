import React, {useEffect, useState} from 'react';
import { Header, LoginForm } from '../components';
import { NavLink,useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [loginAuth, setLoginAuth] = useState<boolean>(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (loginAuth) {
            window.localStorage.removeItem('email')
            navigate('/');
        }
    }, [loginAuth, navigate]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/users/events');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message === 'user_verified') {
                setLoginAuth(true);
                eventSource.close();
            }
        };
        return () => eventSource.close();
    }, []);

    return (
        <>
            <div className="main">
                <Header />
                <LoginForm loginAuth={loginAuth} setLoginAuth={setLoginAuth}/>
            </div>
        </>
    )
}

export default Login;
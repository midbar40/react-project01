import React, {useEffect, useState} from 'react';
import { Header, LoginForm } from '../components';
import { NavLink } from 'react-router-dom';

const Login: React.FC = () => {
    const [loginAuth, setLoginAuth] = useState<boolean>(false);
    
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/users/events');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message === 'verified') {
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
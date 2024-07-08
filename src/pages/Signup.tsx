import React, { useState, useEffect } from 'react';
import { SignUpForm, SignUpFormDetail } from '../components';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/AuthStore';


const Signup: React.FC = () => {
    const [emailAuth, setEmailAuth] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const setCookies = useAuthStore(state => state.setCookies);
    let navigate = useNavigate();

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/users/events');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.message) {
                case 'verified':
                    setEmailAuth(true);
                    break;
                case 'user_verified':
                    setCookies('userVerified');
                    navigate('/');
                    eventSource.close();
                    break;
            }
        };

        return () => eventSource.close();
    }, []);

    return (
        <>
            {!emailAuth ? <SignUpForm setEmailAuth={setEmailAuth} email={email} setEmail={setEmail} emailAuth={emailAuth} /> : <SignUpFormDetail email={email} />}
        </>
    );
};

export default Signup;

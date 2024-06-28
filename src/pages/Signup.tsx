import React, { useState, useEffect } from 'react';
import {  SignUpForm, SignUpFormDetail } from '../components';


const Signup: React.FC = () => {
    const [emailAuth, setEmailAuth] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/users/events');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message === 'verified') {
                setEmailAuth(true);
                eventSource.close();
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

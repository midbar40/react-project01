import React, { useState,useEffect } from 'react';
import { Header, SignUpForm, SignUpFormDetail } from '../components';

const Signup: React.FC = () => {
    const [emailAuth, setEmailAuth] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        let localEmail = window.localStorage.getItem('email')
        console.log('localEmail', localEmail)
        if (localEmail) {
            setEmail(localEmail)
            setEmailAuth(true)
            window.localStorage.removeItem('email'); // removeItem 수정
        }
    }, [])

    return (
        <div className="main">
            <Header />
            {!emailAuth ? <SignUpForm setEmailAuth={setEmailAuth} email={email} setEmail={setEmail}/> : <SignUpFormDetail email={email}/>}
        </div>
    )
}

export default Signup;
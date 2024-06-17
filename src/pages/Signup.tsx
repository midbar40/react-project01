import React, { useState } from 'react';
import { Header, SignUpForm, SignUpFormDetail } from '../components';

const Signup: React.FC = () => {
    const [emailAuth, setEmailAuth] = useState<boolean>(false);
    return (
        <div className="main">
            <Header />
            {!emailAuth ? <SignUpForm setEmailAuth={setEmailAuth}/> : <SignUpFormDetail />}
        </div>
    )
}

export default Signup;
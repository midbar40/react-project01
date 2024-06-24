import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SignUpForm.css';

// prop 타입 정의
interface SignUpFormProps {
    setEmailAuth: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    emailAuth : boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ emailAuth, setEmailAuth, email, setEmail}) => {
    const [checkEmail, setCheckEmail] = useState<boolean>(false); // 이메일 체크용
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const registerUsers = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // 서버로 유저 정보 전송
        const response = await fetch('http://localhost:5000/api/users/emailAuth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
        const data = await response.json();
        console.log('프론트', data);
        if (data.message === 'success') {
            window.localStorage.setItem('email', email);
            setCheckEmail(true);
            setEmail(email);
        }  
         
    }
    
    return (
        <>
            <div className="signup">
                <form className='signup-form'>
                    <h1>Welcome to Customer-Finder</h1>
                    <div className="form-group">
                        {!checkEmail ?
                            (
                                <>
                                    <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요" onChange={handleInputChange} required />
                                    <button type="submit" className='signup-btn' onClick={registerUsers}>회원가입</button>
                                </>
                            )
                            : (<p className='check-email'>이메일을 통해 인증을 진행해주세요</p>)}
                    </div>
                    <div className="other-btns">
                    <span>이미 가입하셨나요?</span><NavLink to='/login'><button>로그인</button></NavLink>
                </div>
                </form>
            </div>
        </>
    )
}

export default SignUpForm;
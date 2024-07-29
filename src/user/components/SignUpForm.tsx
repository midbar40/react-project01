import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/SignUpForm.css';
import { Warning } from 'postcss';

// prop 타입 정의
interface SignUpFormProps {
    setEmailAuth: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    emailAuth: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ emailAuth, setEmailAuth, email, setEmail }) => {
    const [warning, setWarning] = useState({
        state: false,
        message: ''
    })
    const [checkEmail, setCheckEmail] = useState<boolean>(false); // 이메일 체크용
    let navigate = useNavigate();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const sendEmailAndGetAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if (!email_regex.test(email.trim())) return setWarning({ state: true, message: "유효한 이메일 형식이 아닙니다." })

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
        if (data.message === '이메일 전송 성공') {
            window.localStorage.setItem('email', email);
            setCheckEmail(true);
            setEmail(email);
            setWarning({ state: false, message: "" })
        } else if (data.message === '이미 존재하는 회원입니다') {
            alert('이미 가입된 이메일입니다, 로그인 화면으로 이동합니다');
            navigate('/login');
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
                                    <button type="submit" className='signup-btn' onClick={sendEmailAndGetAuth}>회원가입</button>
                                    {warning.state && <p className='warning-message' style={{ color: 'red' }}>{warning.message}</p>}
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
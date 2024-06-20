import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/LoginForm.css';

interface LoginFormProps {
    loginAuth: boolean;
    setLoginAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({loginAuth, setLoginAuth}) => {
    const [email, setEmail] = useState<string>('');

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    }

    const handleSendAuthEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({email})
            })
            const result = await response.json();
            console.log('로그인 결과:', result);
        } catch (error) {
            console.log("로그인 에러 :",error)
        }
    }
    return (
        <div className="login">
                <form className='login-form'>
                    <h1>로그인하세요</h1>
                    <div className="login-form-group">
                        <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요" onChange={handleEmailInputChange} required/>
                        <button type="submit" className='login-btn' onClick={handleSendAuthEmail}>로그인</button>
                    </div>
                <div className="other-btns">
                    <NavLink to='/signup'><button>아직 회원이 아니신가요?</button></NavLink>
                </div>
                </form>
            </div>
    )
}

export default LoginForm;
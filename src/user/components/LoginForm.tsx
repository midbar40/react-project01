import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';

interface LoginFormProps {
    loginAuth: boolean;
    setLoginAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({loginAuth, setLoginAuth}) => {
    const [email, setEmail] = useState<string>('');
    const [sendEmail, setSendEmail] = useState<boolean>(false);
    let navigate = useNavigate();

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        console.log(e.target.value);
        setEmail(e.target.value);
    }

    const handleSendAuthEmail = async (e: React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({email})
            })
            const result = await response.json();
            if(result.message === 'success') {
                setSendEmail(true);
            } else if (result.message === 'notExist') {
                alert('가입되지 않은 이메일입니다, 회원가입 화면으로 이동합니다');
                navigate('/signup')
            }
            else {
                console.log('로그인 실패 :', result.message);
            }
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
                        {!sendEmail ? 
                        <>
                            <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요" onChange={handleEmailInputChange} required/>
                            <button type="submit" className='login-btn' onClick={handleSendAuthEmail}>로그인</button>
                        </>
                        : 
                        <p className='check-email'>이메일을 통해 인증을 진행해주세요</p>
                        }
                        
                    </div>
                <div className="other-btns">
                <span>아직 회원이 아니신가요?</span><NavLink to='/signup'><button>회원가입</button></NavLink>
                </div>
                </form>
            </div>
    )
}

export default LoginForm;


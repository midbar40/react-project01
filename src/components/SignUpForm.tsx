import React, { useState } from 'react';
import '../styles/SignUpForm.css';

// prop 타입 정의
interface SignUpFormProps {
    setEmailAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({setEmailAuth}) => {
   const [email, setEmail] = useState<string>('');
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
            body: JSON.stringify({email})
        })
        const data = await response.json();
        console.log('data',data)
   }
    return (
        <>
            <div className="singup">
                <form className='singup-form'>
                    <h1>Welcome to Customer-Finder</h1>
                    <div className="form-group">
                        <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요" onChange={handleInputChange} required />
                        <button type="submit" className='singup-btn' onClick={registerUsers}>회원가입</button>
                    </div>                
                </form>
            </div>
        </>
    )
}

export default SignUpForm;
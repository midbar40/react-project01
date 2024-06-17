import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpFormDetail.css';
import { SignUpFormDetailState } from '../types';

// 상태의 타입 정의
type State = {
    email: string;
    company: string;
    name: string;
    contact: string;
};

// 액션 타입 정의
type Action = {
    type: string;
    value: string;
};

const reducer = (state: State, action: Action): State => {
    return {
        ...state,
        [action.type]: action.value
    }
};


const SignUpFormDetail: React.FC = () => {
    const [emptyCheck, setEmptyCheck] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>(''); 
    let navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, {
        email: '',
        company: '',
        name: '',
        contact: ''
    });
    const { email, company, name, contact } = state;
    
    // 입력값이 있는지 확인
    const checkInputEmpty = () => { 
        return email === '' || company === '' || name === '' || contact === ''; 
    }
    // 이메일 유효성 검사
    const checkEmailIsValid = () => {
        const emailRegexp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        return emailRegexp.test(email);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, value });
        // 이메일 유효성 검사
        if(name === 'email'){
            if(!checkEmailIsValid()){
                setErrorText('이메일 형식이 올바르지 않습니다');
            } else {
                setErrorText('');
            }
        }

        // 입력값이 있는지 확인
         if(checkInputEmpty()) {
            setEmptyCheck(true);
            return;
        } else {
            setEmptyCheck(false);
            setErrorText('');
        }
    }

    const registerUsers = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // 서버로 유저 정보 전송
        // 가입 완료 후 로그인 페이지로 이동
        e.preventDefault();
        const requestBody: SignUpFormDetailState = {
            email,
            company,
            name,
            contact
        };
        if(checkInputEmpty()) {
            setEmptyCheck(true);
            setErrorText('빈 칸을 모두 입력해주세요');
            return;
        }        
        if(!checkEmailIsValid()){
            setErrorText('이메일 형식이 올바르지 않습니다');
            return;
        }     
        setErrorText('');


        try {
            const response = await fetch("http://127.0.0.1:5000/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                if (data.message === 'success') {
                    alert('회원가입이 완료되었습니다');
                    navigate('/login');
                }
            } else {
                const data = await response.json();
                if(data.message === 'alreadyExist'){
                    setEmptyCheck(false);
                    setErrorText('이미 존재하는 이메일입니다');
                }
            }
        } catch (error) {
            console.log('네트워크 오류 또는 예외 발생', error);
        }
    }
    return (
        <>
            <div className="singup">
                <form className='singup-form'>
                    <h1>Welcome to Customer-Finder</h1>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요" onChange={handleInputChange} required />
                    </div>                
                    <div className="form-group">
                        <label htmlFor="company">회사명</label>
                        <input type="text" id="company" name="company" placeholder="회사명을 입력해주세요" onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">이름</label>
                        <input type="text" id="name" name="name" placeholder="이름을 입력해주세요" onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">연락처</label>
                        <input type="tel"
                            id="contact"
                            name="contact"
                            placeholder="연락처를 입력해주세요"
                            minLength={9}
                            maxLength={14}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            onChange={handleInputChange}
                            required />
                    </div>
                    {emptyCheck && <p className='empty-check' style={{color : 'red', textAlign:'right', marginBottom :'10px'}}>{errorText}</p>}
                    <button type="submit" className='singup-btn' onClick={registerUsers}>회원가입</button>
                </form>
            </div>
        </>
    )
}

export default SignUpFormDetail;
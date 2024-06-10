import React, {useReducer} from 'react';
import '../styles/SignUpForm.css';
import { SignUpFormState } from '../types';

// 상태의 타입 정의
type State ={
    email: string;
    password: string;
    passwordCheck: string;
    company: string;
    companyNumber: string;
    contact: string;
};

// 액션 타입 정의
type Action = {
    type: string;
    value: string;
};

const reducer = (state: State, action : Action) : State =>{
    return {
        ...state,
        [action.type]: action.value
    }
};


const SignUpForm : React.FC = () => {
    const [state, dispatch] = useReducer(reducer, {
        email: '',
        password: '',
        passwordCheck: '',
        company: '',
        companyNumber: '',
        contact: ''
    });
    const { email, password, passwordCheck, company, companyNumber, contact } = state;

    const registerUsers = (e: React.MouseEvent<HTMLButtonElement>) => {
        // 서버로 유저 정보 전송
        // 가입 완료 후 로그인 페이지로 이동
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: e.target.name, value: e.target.value });
    }
    return (
        <>
            <div className="singup">
                    <form className='singup-form'>
                        <h1>Market-Insight으로 초대합니다</h1>
                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                            <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요" onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">비밀번호</label>
                            <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요" onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-check">비밀번호 확인</label>
                            <input type="password" id="password-check" name="password-check" placeholder="비밀번호를 다시 입력해주세요" onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">회사명</label>
                            <input type="text" id="company" name="company" placeholder="회사명을 입력해주세요" onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company-number">사업자번호</label>
                            <input type="text" id="company-number" name="company-number" placeholder="사업자번호를 입력해주세요" onChange={handleInputChange} required />
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
                        <button type="submit" className='singup-btn' onClick={registerUsers}>회원가입</button>
                    </form>
                </div>
        </>
    )
}

export default SignUpForm;
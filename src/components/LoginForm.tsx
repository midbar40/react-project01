import react from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/LoginForm.css';

const LoginForm: React.FC = () => {
    return (
        <div className="login">
                <h1>로그인</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요" />
                    </div>
                    <button type="submit">로그인</button>
                </form>
                <div className="other-btns">
                    <NavLink to='/signup'><button>회원가입</button></NavLink>
                    <button>아이디찾기</button>
                    <button>비밀번호찾기</button>
                </div>
            </div>
    )
}

export default LoginForm;
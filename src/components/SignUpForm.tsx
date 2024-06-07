import react from 'react';
import '../styles/SignUpForm.css';

const SignUpForm : React.FC = () => {
    return (
        <>
            <div className="singup">
                    <form className='singup-form'>
                        <h1>Market-Insight으로 초대합니다</h1>
                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                            <input type="email" id="email" name="email" placeholder="이메일을 입력해주세요" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">비밀번호</label>
                            <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-check">비밀번호 확인</label>
                            <input type="password" id="password-check" name="password-check" placeholder="비밀번호를 다시 입력해주세요" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">회사명</label>
                            <input type="text" id="company" name="company" placeholder="회사명을 입력해주세요" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company-number">사업자번호</label>
                            <input type="text" id="company-number" name="company-number" placeholder="사업자번호를 입력해주세요" required />
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
                                required />
                        </div>
                        <button type="submit" className='singup-btn'>회원가입</button>
                    </form>
                </div>
        </>
    )
}

export default SignUpForm;
import React from "react";

const AdminLogin: React.FC = () => {
    return (
        <div className="main">
            <div className="login-form">
                <form>
                    <span>관리자 로그인</span>
                    <input type="text" placeholder="이메일을 입력하세요"/>
                    <button type="submit">확인</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
import react from 'react';
import { Header } from '../components';

const Mypage: React.FC = () => {
    return (
        <>
            <div className="main">
                <Header />
                <div className="myPage">
                    <h1>마이페이지</h1>
                    <div className="member-info">
                        <div><span>회사명</span><span>고객회사</span></div>
                        <div><span>사업자번호</span><span>000-00-00000</span></div>
                        <div><span>가입자</span><span>엘론머스크</span></div>
                        <div><span>연락처</span><span>010-0000-0000</span></div>
                        <div><span>아이디(이메일)</span><span>tesla@naver.com</span></div>
                    </div>
                    <div className="marketing-info">
                        <p>주요키워드</p>
                        <form className='interest'>
                            <input type="checkbox" /><span>네이버</span>
                            <input type="checkbox" /><span>구글</span>
                            <input type="checkbox" /><span>유튜브</span>
                            <input type="checkbox" /><span>카카오</span>
                            <input type="checkbox" /><span>인스타</span>
                            <input type="checkbox" /><span>기타</span>
                            <input type="text" placeholder="기타 키워드를 입력해주세요" />
                        </form>
                    </div>
                    <button type="submit">회원정보수정</button>
                </div>
            </div>
        </>
    )
}

export default Mypage;
import react, { useEffect } from 'react';
import '../styles/MyPageUserInfo.css';

const MyPageUserInfo: React.FC = () => {
    useEffect(() => {
        fetchUserInfo();
    },[])
    const fetchUserInfo = async () => {
        // DB에서 유저 정보를 가져오는 함수
        const response = await fetch("http://localhost:5000/api/users/info", {
            method :"GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json();
        console.log(data.data);
    }
    return (
        <div className="main">
            <div className="myPage">
                <h1>마이페이지</h1>
                <div className="member-info">
                    <div><span>아이디(이메일)</span><span>tesla@naver.com</span></div>
                    <div><span>회사명</span><span>고객회사</span></div>
                    <div><span>가입자</span><span>엘론머스크</span></div>
                    <div><span>연락처</span><span>010-0000-0000</span></div>
                    {/* <div><span>주요키워드</span><span>'내가등록한키워드'</span></div> */}
                </div>
                <div className="marketing-info">
                    <h3>관심 마케팅채널</h3>
                    <form className='interest'>
                        <div>
                            <input type="checkbox" name='naver' id='naver' /><label htmlFor='naver'>네이버</label>
                            <input type="checkbox" name='google' id='google' /><label htmlFor='google'>구글</label>
                            <input type="checkbox" name='youtube' id='youtube' /><label htmlFor='youtube'>유튜브</label>
                        </div>
                        <div>
                            <input type="checkbox" name='kakao' id='kakao' /><label htmlFor='kakao'>카카오</label>
                            <input type="checkbox" name='insta' id='insta' /><label htmlFor='insta'>인스타</label>
                            <input type="checkbox" name='facebook' id='facebook' /><label htmlFor='facebook'>페이스북</label>
                        </div>
                        <div className='etc'>
                            <input type="checkbox" name='etc' id='etc' /><label htmlFor='etc' id='etc-label'>기타</label>
                            <input type="text" placeholder="기타 채널을 입력해주세요" id='etc-content' />

                        </div>
                    </form>
                </div>
                <button type="submit" className='edit-btn'>회원정보수정</button>
            </div>
        </div>
    )
}

export default MyPageUserInfo;
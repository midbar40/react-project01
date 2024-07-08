import react, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import '../styles/MyPageUserInfo.css';

const fetchUserInfo = async () => {
    // DB에서 유저 정보를 가져오는 함수
    const response = await fetch("http://localhost:5000/api/users/info", {
        method :"GET",
         headers: { "Content-type" : "application/json" },
         credentials : "include"
    })
    const data = await response.json();
    return data.data;
}

const MyPageUserInfo: React.FC = () => {

// react-query를 사용하여 useInfo를 캐쉬에 저장해서 불러온다
    const { data, error, isLoading } = useQuery({
    queryKey : ['userInfo'],
    queryFn : fetchUserInfo,
    gcTime: 10 * 60 * 1000, // 10분
    staleTime: 5 * 60 * 1000, // 5분
});
// 캐쉬데이터가 로딩중이거나 에러가 발생하면 로딩중이라는 문구를 띄운다
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log('캐쉬데이터 :', data)
    return (
        <div className="main">
            <div className="myPage">
                <h1>마이페이지</h1>
                <div className="member-info">
                    <div><span>아이디(이메일)</span><span>{data.email}</span></div>
                    <div><span>회사명</span><span>{data.company}</span></div>
                    <div><span>가입자</span><span>{data.name}</span></div>
                    <div><span>연락처</span><span>{data.contact}</span></div>
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
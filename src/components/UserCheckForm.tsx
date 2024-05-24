import React from 'react';
import '../styles/UserCheckForm.css';
import { RequestBody } from '../types'

const UserCheckForm: React.FC = () => {
    const searchCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
         
        const name = (document.getElementById('name'))?.nodeValue ?? null;
        const number = (document.getElementById('number'))?.nodeValue ?? null;
        const keyword = (document.getElementById('keyword'))?.nodeValue ?? null;

        const requestBody: RequestBody = {
            name,
            number,
            keyword
        };

        // 서버로 데이터 전송하고 결과값 받아오기
        const fetchWebMarketingData = async () => {
            const response = await fetch('서버url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log(data);
        };
        alert('검색중입니다');
    };
    return(
        <div className='checkScore'>
            <div className='userform'>
                <form>
                    <div className='inform'>
                            <p>우리 회사의 온라인 마케팅 현황을 실시간으로 확인합니다</p>
                            <p>입력데이터를 기반으로 웹 분석을 시작합니다 </p>
                    </div>
                    <div className='company-name'>
                        <label htmlFor="name">사업자명</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className='company-number'>
                        <label htmlFor="number">사업자번호</label>
                        <input type="text" id="number" name="number" />
                    </div>
                    <div className='company-keyword'>
                        <label htmlFor="keyword">주요키워드</label>
                        <input type="text" id="keyword" name="keyword" />
                    </div>
                    <div className='checkBtn'>
                        <button type="submit" onClick={searchCompany}>점수확인</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserCheckForm;
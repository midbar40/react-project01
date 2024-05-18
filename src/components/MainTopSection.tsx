import React from "react";
import { NavLink } from 'react-router-dom';
import '../styles/MainTopSection.css';
import brandLogoData from '../data/mainSectionImgs.json'; // tsconfig.json에서 "resolveJsonModule": true로 설정해야함
import { mainBrandLogo } from '../types'

function MainTopSection(){
    
    return(
        <div className="main-section">
            <div className="main-section-first">
                <div className="main-section-first-left">
                    <div>{/* map메서드 사용해야하는 곳? */}
                        <h2>즉각적인 가시성</h2>
                        <h2>키워드 기반 타겟팅으로 잠재고객에게 광고 노출</h2>
                        <h2>성과 측정 및 분석</h2>
                        <h2>간편한 예산관리</h2>
                        <h2>강력한 Visual Impact를 통한 인지도 향상</h2>
                        <h2>세분화된 타겟팅 설정</h2>
                    </div>
                </div>
                <div className="main-section-first-right">
                    <div>{/* map메서드 사용해야하는 곳? */}
                        {brandLogoData.map((brandLogo: mainBrandLogo) => 
                            <div key={brandLogo.id}>
                                {/* webpack은 동적으로 이미지 경로를 가져오지 못한다 img src = require(경로).default  오류남*/}
                                <img src={image[brandLogo.src]} alt={brandLogo.alt} /> 
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="main-section-second">
                <div className="main-section-second-link">
                    <div className="main-section-second-left-btn"><NavLink to='/checkscore'className="nav_link">내 마케팅 점수 확인하기</NavLink></div>
                    <div className="main-section-second-right-btn"><NavLink to='/consult'className="nav_link">상담하기</NavLink></div>
                </div>
            </div>    
        </div>
    )
}

export default MainTopSection;
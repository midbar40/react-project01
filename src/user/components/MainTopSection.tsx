import React from "react";
import { NavLink } from 'react-router-dom';
import '../styles/MainTopSection.css';
import brandLogoData from '../data/mainSectionImgs.json'; // tsconfig.json에서 "resolveJsonModule": true로 설정해야함
import { mainBrandLogoData } from '../../types'
import { ChartRader, ChartBar } from './index';

// 특정 디렉토리 내의 모든 이미지를 동적으로 import
const requireContext = require.context('../../assets/imgs', false, /\.(png|jpe?g|gif|svg)$/); // npm i @types/webpack-env, tsconfig types에 webpack-dev 추가  

const images : { [key : string ] : string } = {};
requireContext.keys().forEach((key: string) => {
    images[key.replace('./', '')] = requireContext(key).default;
});

const MainTopSection : React.FC = () => {
    const brandLogos: mainBrandLogoData[] = brandLogoData;
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
                    <div className="eachBrandContent">{/* map메서드 사용해야하는 곳? */}
                        {brandLogos.map((brandLogo: mainBrandLogoData) => 
                            <div key={brandLogo.id} className="logoNcontent">
                                {/* webpack은 동적으로 이미지 경로를 가져오지 못한다 img src = require(경로).default  오류남*/}
                                <div><img src={images[brandLogo.src]} alt={brandLogo.alt} /> </div>
                                <h3>{brandLogo.description}</h3>
                            </div>
                        )}
                        <div className="main-charts">
                            <ChartRader /> 
                            <ChartBar />    
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-section-second">
                <div className="main-section-second-link">
                <NavLink to='/checkscore'className="nav_link"><div className="main-section-second-left-btn">내 마케팅 점수 확인하기</div></NavLink>
                <NavLink to='/consult'className="nav_link"><div className="main-section-second-right-btn">상담하기</div></NavLink>
                </div>
            </div>    
        </div>
    )
}

export default MainTopSection;
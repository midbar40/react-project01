import React, { useState } from 'react';
import { UserCheckForm, CrawlingResults } from '../components';

export const CheckScore: React.FC = () => {
    const [isData, setIsData] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState({
        brandName: '',
        keyword: ''
    })

    return (
        <> {!isData ? <UserCheckForm setIsData={setIsData} setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword} /> : <CrawlingResults searchKeyword={searchKeyword} setIsData={setIsData} isData={isData}/>} </>
    )
}

export default CheckScore;
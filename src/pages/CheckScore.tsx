import React,{useEffect, useState} from 'react';
import { UserCheckForm, CrawlingResults } from '../components';

export const CheckScore : React.FC = () => {
    const [isData, setIsData] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    
    return(
        <> {!isData ? <UserCheckForm setIsData={setIsData} setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword}/> : <CrawlingResults searchKeyword={searchKeyword} setIsData={setIsData}/> } </>
        )
}

export default CheckScore;
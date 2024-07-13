import React,{useEffect, useState} from 'react';
import { UserCheckForm, CrawlingResults } from '../components';

export const CheckScore : React.FC = () => {
    useEffect(()=>{
    const crawlingData = sessionStorage.getItem('searchdata')
    if(crawlingData){
        JSON.parse(crawlingData)
    }
    },[])
    const [isData, setIsData] = useState(false)
    const crawlingData = sessionStorage.getItem('searchdata')
    return(
        <> {!isData ? <UserCheckForm setIsData={setIsData}/> : <CrawlingResults/> } </>
        )
}

export default CheckScore;
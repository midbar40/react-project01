import React, { ReactEventHandler, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom'
import '../styles/CrawlingResults.css'

interface CrawlingResultsProps {
  searchKeyword: string;
  setIsData: React.Dispatch<React.SetStateAction<boolean>>;
}

const CrawlingResults: React.FC<CrawlingResultsProps> = ({ searchKeyword, setIsData }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsWord = decodeURIComponent(searchParams.toString().replace('search=', '')) // params 문자열 가져와서 decode하고 'search='문자열 제거

  const crawlingData = sessionStorage.getItem(searchKeyword || paramsWord) // 같은 키워드 재검색시 searchKeyword가 null이 됨, 이 때 params에서 가져오도록 설정
  const parseData = JSON.parse(crawlingData as string)
  const googleResults = parseData[0]
  const naverResults = parseData[1]

  return (
    <div className="searchResults">
      <div className="searchResults-summary">
        <h3>{searchKeyword || paramsWord} 의 검색결과 입니다(3page내 결과)</h3>
      </div>
      <div className="googleResult">
        <div className="googleResult-summary">
          <div>구글 :   키워드가 포함된 게시글 개수<span>{googleResults.length}</span></div>
        </div>
        {googleResults.length > 0 ? googleResults.map((ele: { key: string; link: string; title: string; }) =>
        (
          <div key={ele.key}>
            <p>{ele.title}</p>
            <p>{ele.link}</p>
          </div>
        )
        ) : <p>검색결과가 존재하지 않습니다</p>}
      </div>

      <div className="naverResult">
        <div className="naverResult-summary">
          <div>네이버 : 키워드가 포함된 게시글 개수<span>{naverResults.length}</span></div>
        </div>
        {naverResults.length > 0 ? naverResults.map((ele: { key: string; type: string; title: string; link: string; }) =>
        (
          <div key={ele.key}>
            <p>{ele.type}</p>
            <p>{ele.title}</p>
            <p>{ele.link}</p>
          </div>
        )) : <p>검색결과가 존재하지 않습니다</p>}
      </div>
    </div>
  )
}

export default CrawlingResults
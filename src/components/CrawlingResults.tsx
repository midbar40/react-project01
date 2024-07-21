import React, { ReactEventHandler, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/CrawlingResults.css'

interface CrawlingResultsProps {
  searchKeyword: string;
  setIsData: React.Dispatch<React.SetStateAction<boolean>>;
}

const CrawlingResults: React.FC<CrawlingResultsProps> = ({ searchKeyword, setIsData }) => {
  let navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const paramsWord = decodeURIComponent(searchParams.toString().replace('search=', '')) // params 문자열 가져와서 decode하고 'search='문자열 제거
  const crawlingData = sessionStorage.getItem(searchKeyword || paramsWord) // 같은 키워드 재검색시 searchKeyword가 null이 됨, 이 때 params에서 가져오도록 설정

  useEffect(() => {
    if (crawlingData === null) {
      setIsData(false)
    }

  }, [crawlingData, setIsData])

  if (crawlingData !== null) {
    const parseData = JSON.parse(crawlingData as string)
    const googleResults = parseData[0]
    const naverResults = parseData[1]

    return (
      <div className="searchResults">
        <div className="searchResults-summary">
          <h3 className="text-2xl font-semibold"> <span className="searchResults-keyword">"{searchKeyword || paramsWord}"</span> 의 검색결과 입니다 (3page 검색결과)</h3>
        </div>
        <div className="googleResult">
          <div className="googleResult-summary font-semibold	text-lg">
            <div className="googleResult-text">구글 : 키워드가 포함된 게시글 <span>{googleResults.length} 개</span></div>
          </div>
          <table>
            <tr>
              <th>순번</th>
              <th>제목</th>
              <th>링크</th>
            </tr>
            {googleResults.length > 0 ? googleResults.map((ele: { key: string; link: string; title: string; }, index: number) => (
              <>
                <tr className={ele.key}>
                  <td>{index + 1}</td>
                  <td>{ele.title}</td>
                  <td>{ele.link}</td>
                </tr>
              </>
            )) : <p>검색결과가 존재하지 않습니다</p>}
          </table>
        </div>

        <div className="naverResult">
          <div className="naverResult-summary font-semibold	text-lg	">
            <div className="naverResult-text">네이버 : 키워드가 포함된 게시글 <span>{naverResults.length} 개</span></div>
          </div>
          <table>
            <th>순번</th>
            <th>유형</th>
            <th>제목</th>
            <th>링크</th>
            {naverResults.length > 0 ? naverResults.map((ele: { key: string; type: string; title: string; link: string; }, index: number) => (
              <>
                <tr className={ele.key}>
                  <td>{index + 1}</td>
                  <td>{ele.type}</td>
                  <td>{ele.title}</td>
                  <td>{ele.link}</td>
                </tr>
              </>
            )) : <p>검색결과가 존재하지 않습니다</p>}
          </table>
        </div>
      </div>
    )
  } else {
    return null // crawlingData가 null인 경우 아무것도 렌더링하지 않음
  }
}

export default CrawlingResults
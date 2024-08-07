import React, { ReactEventHandler, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/CrawlingResults.css'
import { HightLightText } from ".";

type SearchKeywordType = {
  brandName: string;
  keyword: string;
};

interface CrawlingResultsProps {
  searchKeyword: SearchKeywordType;
  isData: boolean;
  setIsData: React.Dispatch<React.SetStateAction<boolean>>;
}
const CrawlingResults: React.FC<CrawlingResultsProps> = ({ searchKeyword, setIsData, isData }) => {
  console.log('isData', isData)

  let navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const paramsWord = decodeURIComponent(searchParams.toString().replace('search=', '')) // params 문자열 가져와서 decode하고 'search='문자열 제거
  const query = searchKeyword.brandName as string + '+' + searchKeyword.keyword as string

  const crawlingData = sessionStorage.getItem(query || paramsWord) // 같은 키워드 재검색시 searchKeyword가 null이 됨, 이 때 params에서 가져오도록 설정


  useEffect(() => {
    if (crawlingData === null) {
      setIsData(false)
    }

  }, [crawlingData, setIsData])

  if (crawlingData !== null) {
    const parseData = JSON.parse(crawlingData as string)
    const googleResults = parseData[0]
    const naverResults = parseData[1]
    const youtubeResults = parseData[2]

    return (

      <div className="searchResults">
        <div className="searchResults-summary">
          <h3 className="text-2xl font-semibold"> <span className="searchResults-keyword">"{searchKeyword.keyword || paramsWord}"</span> 의 검색결과 입니다 (1page 검색결과)</h3>
        </div>
        <div className="googleResult">
          <div className="googleResult-summary font-semibold	text-lg">
            <div className="googleResult-text">구글 : 키워드가 포함된 게시글 <span>{googleResults.length} 개, 점수{showGoogleScore(+googleResults.length)}</span></div>
          </div>
          {googleResults.length > 0 ?
            <table>
              <thead>
                <tr>
                  <th>순번</th>
                  <th>유형</th>
                  <th>제목</th>
                  <th>링크</th>
                </tr>
              </thead>
              <tbody>
                {googleResults.map((ele: { key: string; type: string; link: string; title: string; }, index: number) => (
                  <tr key={ele.key}>
                    <td>{index + 1}</td>
                    <td>{ele.type}</td>
                    <td>
                      <HightLightText text={ele.title} searchKeywordBrandName={searchKeyword.brandName} paramsWord={paramsWord} />
                    </td>
                    <td>{ele.link}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            : <p>검색결과가 존재하지 않습니다</p>}
        </div>

        <div className="naverResult">
          <div className="naverResult-summary font-semibold	text-lg	">
            <div className="naverResult-text">네이버 : 키워드가 포함된 게시글 <span>{naverResults.length} 개, 점수{showNaverScore(+naverResults.length)}</span></div>
          </div>
          {naverResults.length > 0 ?
            <table>
              <thead>
                <tr>
                  <th>순번</th>
                  <th>유형</th>
                  <th>제목</th>
                  <th>링크</th>
                </tr>
              </thead>
              <tbody>
                {naverResults.map((ele: { key: string; type: string; title: string; link: string; }, index: number) => (
                  <tr key={ele.key}>
                    <td>{index + 1}</td>
                    <td>{ele.type}</td>
                    <td>
                      <HightLightText text={ele.title} searchKeywordBrandName={searchKeyword.brandName} paramsWord={paramsWord} />
                    </td>
                    <td>{ele.link}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            : <p>검색결과가 존재하지 않습니다</p>}
        </div>

        <div className="youtubeResult">
          <div className="youtubeResult-summary font-semibold	text-lg">
            <div className="youtubeResult-text">유튜브 : 키워드가 포함된 영상 <span>{youtubeResults.length} 개, 점수{showGoogleScore(+youtubeResults.length)}</span></div>
          </div>
          {youtubeResults.length > 0 ?
            <table>
              <thead>
                <tr>
                  <th>순번</th>
                  <th>유형</th>
                  <th>제목</th>
                  <th>조회수</th>
                  <th>링크</th>
                </tr>
              </thead>
              <tbody>
                {youtubeResults.map((ele: { key: string; type: string; link: string; title: string; hits: string; }, index: number) => (
                  <tr key={ele.key}>
                    <td>{index + 1}</td>
                    <td>{ele.type}</td>
                    <td>
                      <HightLightText text={ele.title} searchKeywordBrandName={searchKeyword.brandName} paramsWord={paramsWord} />
                    </td>
                    <td>{ele.hits}</td>
                    <td>{ele.link}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            : <p>검색결과가 존재하지 않습니다</p>}
        </div>
      </div>
    )
  } else {
    return null // crawlingData가 null인 경우 아무것도 렌더링하지 않음
  }
}

export default CrawlingResults

const showGoogleScore = function (result: number) {
  if (result > 20) return "A";
  else if (result > 10 && result < 20) return "B";
  else return "C";
}
const showNaverScore = function (result: number) {
  if (result > 30) return "A";
  else if (result > 20 && result < 30) return "B";
  else return "C";
}
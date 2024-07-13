import React, { useEffect } from "react";

const CrawlingResults: React.FC = () => {
  const crawlingData = sessionStorage.getItem('searchdata')
  const parseData = JSON.parse(crawlingData as string);
  const googleResults = parseData[0]
  const naverResults = parseData[1]
   
  return (
    <>
      <div className="googleResult">
        {/* <div>구글검색</div>
        <div>3Page 내 키워드가 포함된 게시글 개수<span>{}</span></div> */}
      </div>
    <>
      
      {naverResults.length > 0 ? naverResults.map((ele: { key:string; type: string; title: string; link: string; }) =>
      (
        <div key={ele.key}>
          <p>{ele.type}</p>
          <p>{ele.title}</p>
          <p>{ele.link}</p>
        </div>
      )) : <p>검색결과가 존재하지 않습니다</p>}
    </>
    </>
  )
}

export default CrawlingResults
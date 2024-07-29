import React from "react";

interface HighLightTextProps {
    text: string;
    searchKeywordBrandName: string;
    paramsWord: string;
}

const HighLightText: React.FC<HighLightTextProps> = ({ text, searchKeywordBrandName, paramsWord }) => {
    // searchKeyword와 paramsWord를 '+'로 분리하여 단어 배열로 만듦
    const keywords = [
        searchKeywordBrandName && searchKeywordBrandName,
        ...(paramsWord ? paramsWord.split('+').filter(ele => ele === searchKeywordBrandName) : [])
    ].filter(Boolean); // 빈 문자열 제거
    // 키워드 배열이 비어 있으면 원래 텍스트 반환
    if (keywords.length === 0) return <>{text}</>;

    // 정규식을 키워드 배열로부터 생성
    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    const parts: string[] = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                keywords.includes(part.toLowerCase()) ? (
                    <span key={index} style={{ backgroundColor: 'yellow', fontWeight: '600'}}>{part}</span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </>
    )
}

export default HighLightText;
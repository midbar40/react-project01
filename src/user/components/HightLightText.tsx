import React from "react";

interface HighLightTextProps {
    text: string;
    searchKeyword: string;
    paramsWord: string;
}

const HighLightText: React.FC<HighLightTextProps> = ({ text, searchKeyword, paramsWord }) => {
    // searchKeyword와 paramsWord를 '+'로 분리하여 단어 배열로 만듦
    const keywords = [
        ...(searchKeyword ? searchKeyword.split('+') : []),
        ...(paramsWord ? paramsWord.split('+') : [])
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
                    <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </>
    )
}

export default HighLightText;
import React, { useReducer } from "react";
import "../styles/UserCheckForm.css";
import { RequestBody } from "../types";

// 상태의 타입 정의
type State = {
  name: string;
  number: string;
  keyword: string;
};

// 액션 타입 정의
type Action = {
  type: string;
  value: string;
};

const reducer = (state: State, action: Action): State => {
  return {
    // reducer 함수는 객체를 반환
    ...state,
    [action.type]: action.value,
  };
};

const UserCheckForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    number: "",
    keyword: "",
  });
  const { name, number, keyword } = state;

  const searchCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const requestBody: RequestBody = {
      name,
      number,
      keyword,
    };
    // 서버로 데이터 전송하고 결과값 받아오기
    const fetchWebMarketingData = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log(data);
    };
    fetchWebMarketingData();
    console.log("검색중입니다");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: e.target.name, value: e.target.value });
  };

  return (
    <div className="checkScore">
      <div className="userform">
        <form>
          <div className="inform">
            <p>우리 회사의 온라인 마케팅 현황을 실시간으로 확인합니다</p>
            <p>입력데이터를 기반으로 웹 분석을 시작합니다 </p>
          </div>
          <div className="company-name">
            <label htmlFor="name">사업자명</label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="company-number">
            <label htmlFor="number">사업자번호</label>
            <input
              id="number"
              name="number"
              value={number}
              onChange={handleInputChange}
            />
          </div>
          <div className="company-keyword">
            <label htmlFor="keyword">주요키워드</label>
            <input
              id="keyword"
              name="keyword"
              value={keyword}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="checkBtn" onClick={searchCompany}>
            점수확인
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCheckForm;

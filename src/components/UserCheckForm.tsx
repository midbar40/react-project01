import React, { useReducer, useState } from "react";
import "../styles/UserCheckForm.css";
import { RequestBody } from "../types";
import {Loading} from '../components/index'

// 상태의 타입 정의
type State = {
  name: string;
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

interface searchResult {
  title: string;
  link : string;
}

interface UserCheckFormProp {
  setIsData : React.Dispatch<React.SetStateAction<boolean>>;
}

const UserCheckForm: React.FC<UserCheckFormProp> = ({setIsData}) => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    keyword: "",
  });
  const { name, keyword } = state;

  if(loading) {
    return <Loading/>
  }

  const searchCompany = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true)
    const requestBody: RequestBody = {
      name,
      keyword,
    };
    // 서버로 데이터 전송하고 결과값 받아오기
    const fetchWebMarketingData = async () : Promise<searchResult[][]> => {
      const googleResponse = await fetch("http://localhost:5000/api/websearch/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const naverResponse = await fetch("http://localhost:5000/api/websearch/naver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      return Promise.all([googleResponse, naverResponse])
      .then(res => Promise.all(res.map(res=>res.json())))
      .then(data => {
        console.log(data)
        return data;
      })
      .catch(err => {
        console.log(err) 
        throw err
      })
    };
    // 세션에 저장해놓기
    sessionStorage.setItem('searchdata', JSON.stringify(await fetchWebMarketingData()))
    setIsData(true)
    setLoading(false)
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

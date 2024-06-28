import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; 
import './styles/index.css';
import './styles/tailwind.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>    { /* React.StrictMode를 사용하면 Header가 2번 랜더링 된다 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
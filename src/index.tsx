import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './styles/index.css';
import './styles/tailwind.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>    { /* React.StrictMode를 사용하면 Header가 2번 랜더링 된다 */}
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
          {/* <Header /> */}
            <App />
      </QueryClientProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
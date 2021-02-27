import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./hooks/authContext";
import "antd/dist/antd.less";
import "./styles/style.less";
import Router from "./Router";

ReactDOM.render(
  
    <AuthProvider>
      <Router />
    </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

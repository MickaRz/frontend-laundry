import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"


import FormTransaksi from './pages/FormTransaksi';
import Member from "./pages/User"
// import Login from "./pages/Login"
// import Header from "./header"
// import Footer from "./footer"


// const routing = (
//   <BrowserRouter>
//     <div>
//       <header />
//       <hr />
//       <Routes>
//         <Route exact path="/" component={app} />
//         <Route />
//       </Routes>
//     </div>
//   </BrowserRouter>
// )


ReactDOM.render(
  // routing,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

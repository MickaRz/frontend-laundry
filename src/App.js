import React from "react";
import NotFound from "./notfound";
import Member from "./pages/Member"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import User from "./pages/User";
import Header from "./header"
import Footer from "./footer"
import Paket from "./pages/Paket";
import Transaksi from "./pages/Transaksi";
import FormTransaksi from "./pages/FormTransaksi";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


export default function App() {
  return (

    <BrowserRouter>
      
      <div className="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
 
    <a class="navbar-brand" href="#">Laundry</a>
 
    <button class="navbar-toggler" type="button" data-toggle="collapse" 
    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
    aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
 
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
 
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/Dashboard">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/member">Member</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/paket">Paket</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/user">User</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/transaksi">Transaksi</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/formtransaksi">Form Transaksi</a>
        </li>
        
      </ul>
 
   </div>
 
 </nav>
</div>
        
        <Routes>
          <Route exact path="/" element={App} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/member" element={<Member />} />
          <Route path="/paket" element={<Paket />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/formtransaksi" element={<FormTransaksi />} />

          <Route component={NotFound} />
        </Routes>
        <Footer />
      
     
      
    </BrowserRouter>
  );
}
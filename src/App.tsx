import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./component/LoginPage";
import SignUp from "./component/SignUp";
import { firestore } from "./db/firebase";
import { collection, getDocs, addDoc, updateDoc, doc, setDoc } from "firebase/firestore"; // crud

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import SignUp from "./component/SignUp";
import FindID from "./component/FindID";
import FindPW from "./component/FindPW";
import Home from "./component/Home";
import MyPage from "./component/mypage/MyPage";
import PassWordChange from "./component/mypage/PassWordChange";
import WritePage from "./component/home/WritePage";
import { firestore } from "./db/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore"; // crud

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/id_find" element={<FindID />}></Route>
          <Route path="/pw_find" element={<FindPW />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/PassWordChange" element={<PassWordChange />}></Route>
          <Route path="/writing-page" element={<WritePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './SignUp.scss';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FireStore_DocLoad } from '../function/firebase_crud';
import { firestore } from "../db/firebase";
import { getDocs, collection } from "firebase/firestore";
import SignUpAni from "../animation/SignUpAni";
export default function SignUp() {
  const [id, setId] = useState<string>(""); // id
  const [password, setPassWord] = useState<string>(""); // password
  const [pw_check, setPwCheck] = useState<string>(""); // password check
  const [phone, setPhone] = useState<string>(""); // phone number
  const [name, setName] = useState<string>(""); // phone number

  const [ID_State, setID_State] = useState<Array<string>>([]);
  const [state, setState] = useState<any>([]);
  const [loadding, setLadding] = useState<boolean>(false);

  const regex: RegExp = /[^0-9]/g; //숫자만 찾게 하는 정규표현식

  const ID_Compare = (): boolean => {
    let result: boolean = false;
    ID_State.forEach((doc) => {
      console.log(doc);
      if (id === doc) {
        console.log("aaa");
        result = true;
      }
    })
    console.log(result);
    return result;
  }

  useEffect(() => {
    const getUser = async () => {
      const querySnapshot = await getDocs(collection(firestore, "user"));
      setState(querySnapshot);
      setLadding(true);
    }
    getUser();
  }, []);

  useEffect(() => {
    if (loadding) {
      const temp: Array<string> = [];
      state.forEach((doc: any) => {
        temp.push(doc.id);
      });
      setID_State(temp);
    }
  }, [state])
  useEffect(() => {
    if (loadding) {

      console.log(ID_State);
    }
  }, [ID_State])

  // 회원가입 경고 알림
  useEffect(() => {
    // 아이디 
    console.log("id: " + id);
    if (id.length > 0) {
      if (id.length < 5 || id.length > 20) { // 비밀번호 길이 확인
        SignUpAni("id", 3);
      } else {
        if (ID_Compare()) {
          SignUpAni("id", 5);
        } else {
          SignUpAni("id", 4);
        }
      }
    }
    // 비밀번호
    if (password.length > 0) {
      if (password.length < 5 || password.length > 20) { // 비밀번호 길이 확인
        SignUpAni("pw", 2);
      } else {
        SignUpAni("pw", 1);
      }
    }
    // 비밀번호 재확인
    if (pw_check.length > 0) {
      if (password === pw_check) { // 비밀번호가 같은지 확인
        SignUpAni("pw-check", 1);
      } else {
        SignUpAni("pw-check", 2);
      }
    }

    // 전화번호
    if (phone.length > 0) {
      const result = phone.replace(regex, "");
      if (result.length === 11) {
        SignUpAni("phone", 1);
      } else {
        SignUpAni("phone", 2);
      }

    }
  }, [id, password, pw_check, phone])


  return (
    <div className="signup-page">
      <div className="inner">
        <div className="logo">
          <Link to={'/'} >
            <h4>SJ-Note</h4>
          </Link>
        </div>
        <h4 className='title'>아이디</h4>
        <div className="container">
          <input type="text" onChange={(event) => setId(event.target.value)} />
          <span className="material-symbols-outlined">person</span>
        </div>
        <div className="notice id">
          <h1>5~20자의 영문 소문자, 숫자만 사용 가능합니다</h1>
          <h2>사용가능</h2>
          <h3>이미 사용중인 아이디</h3>
        </div>

        <h4 className='title'>비밀번호</h4>
        <div className="container">
          <input type="password" onChange={(event) => setPassWord(event.target.value)} />
          <span className="material-symbols-outlined">lock</span>
        </div>
        <div className="notice pw">
          <h1>5~20자의 영문 소문자, 숫자만 사용 가능합니다</h1>
          <h2>사용가능</h2>
        </div>

        <h4 className='title'>비밀번호 재확인</h4>
        <div className="container">
          <input type="password" onChange={(event) => setPwCheck(event.target.value)} />
          <span className="material-symbols-outlined">priority</span>
        </div>
        <div className="notice pw-check">
          <h1>비밀번호가 일치하지 않습니다</h1>
          <h2>비밀번호가 일치합니다.</h2>
        </div>

        <h4 className='title'>전화번호</h4>
        <div className="container">
          <input type="text"
            maxLength={11}
            placeholder='-를 제외한 전화번호 11자리를 입력해주세요'
            onChange={(event) => setPhone(event.target.value)} />
          <span className="material-symbols-outlined">call</span>
        </div>
        <div className="notice phone">
          <h1>11자리가 아니거나, 문자가 입력되어 있습니다.</h1>
          <h2>확인입니다</h2>
        </div>

        <h4 className='title'>닉네임</h4>
        <div className="container">
          <input type="text"
            onChange={(event) => setName(event.target.value)} />
        </div>

        <button className="button-classic">가입하기</button>

      </div>
    </div>
  );
}
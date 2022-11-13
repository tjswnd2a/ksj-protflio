import "./SignUp.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  firestore,
  firebaseAuth,
  createUserWithEmailAndPassword,
} from "../db/firebase";
import { addDoc, getDocs, collection } from "firebase/firestore";
import SignUpAni from "../animation/SignUpAni";

export default function SignUp() {
  const [email, setEmail] = useState<string>(""); // id
  const [password, setPassWord] = useState<string>(""); // password
  const [pw_confirm, setConfirmPW] = useState<string>(""); // password check

  const [ID_State, setID_State] = useState<Array<string>>([]);
  const [state, setState] = useState<any>([]);
  const [loadding, setLadding] = useState<boolean>(false);
  const navigate = useNavigate();

  const regex: RegExp = /[^0-9]/g; //숫자만 찾게 하는 정규표현식
  let check: boolean = false;

  const register = async () => {
    if (check) {
      try {
        await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        ).then(() => {
          SetUser();
        });
      } catch (err: any) {
        switch (err.code) {
          case "auth/invalid-email": // 잘못된 형태의 이메일 주소인 경우
            SignUpAni("email", 3);
            break;
          case "auth/email-already-in-use": // 이미 존재하는 이메일 주소인 경우
            SignUpAni("email", 5);
            break;
        }
      }
    }
  };

  const SetUser = async () => {
    const userCollectionRef = collection(firestore, "user");
    try {
      await addDoc(userCollectionRef, {
        id: email,
      });
      navigate(-1);
      alert("회원가입에 성공하셨습니다");
    } catch (err) {
      console.log(err);
    }
  };

  // 회원가입 경고 알림
  useEffect(() => {
    // 비밀번호
    if (password.length > 0) {
      if (password.length < 5 || password.length > 20) {
        // 비밀번호 길이 확인
        SignUpAni("pw", 2);
      } else {
        SignUpAni("pw", 1);
      }
    }

    // 비밀번호 재확인
    if (pw_confirm.length > 0) {
      if (password === pw_confirm) {
        // 비밀번호가 같은지 확인
        SignUpAni("pw-check", 1);
        check = true;
      } else {
        SignUpAni("pw-check", 2);
        check = false;
      }
    }
  }, [email, password, pw_confirm]);

  return (
    <div className="signup-page">
      <div className="inner">
        <div className="logo">
          <Link to={"/"}>
            <h4>SJ.Community</h4>
          </Link>
        </div>
        <h4 className="title">이메일</h4>
        <div className="container">
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
          <span className="material-symbols-outlined">person</span>
        </div>
        <div className="notice email">
          <h1>잘못된 이메일 입니다.</h1>
          <h2>사용가능</h2>
          <h3>이미 사용중인 이메일 입니다.</h3>
        </div>

        <h4 className="title">비밀번호</h4>
        <div className="container">
          <input
            type="password"
            onChange={(event) => setPassWord(event.target.value)}
          />
          <span className="material-symbols-outlined">lock</span>
        </div>
        <div className="notice pw">
          <h1>6~20자의 영문 소문자, 숫자만 사용 가능합니다</h1>
          <h2>사용가능</h2>
        </div>

        <h4 className="title">비밀번호 재확인</h4>
        <div className="container">
          <input
            type="password"
            onChange={(event) => setConfirmPW(event.target.value)}
          />
          <span className="material-symbols-outlined">lock</span>
        </div>
        <div className="notice pw-check">
          <h1>비밀번호가 일치하지 않습니다</h1>
          <h2>비밀번호가 일치합니다.</h2>
        </div>

        <button className="button-classic" onClick={register}>
          가입하기
        </button>
      </div>
    </div>
  );
}

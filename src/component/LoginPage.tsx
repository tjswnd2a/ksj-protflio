import './LoginPage.scss';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseAuth, signInWithEmailAndPassword } from "../db/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import FindID from "./FindID";
export default function LoginPage() {
  const [typingEmail, setEmail] = useState<string>("");
  const [typingPassword, setPassoword] = useState<string>("");
  const [user, setUser] = useState<any>({});

  const [login_state, setLoginState] = useState<string>("/");
  // onAuthStateChanged(firebaseAuth, (currentUser: any) => {
  //   setUser(currentUser);
  // });
  const login = async () => {
    try {
      const curUserInfo = await signInWithEmailAndPassword(firebaseAuth, typingEmail, typingPassword);        // .then(() => {
      alert("성공");
      setLoginState("/home");
      console.log(curUserInfo.user);
      window.location.href = "/home";

    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          alert("가입되어있지 않은 이메일 입니다.");
          break;
        case "auth/wrong-password":
          alert("비밀번호가 일치하지 않습니다.");
          break;
      }
      window.location.href = "/";

    }
  }


  useEffect(() => {
    console.log(user);
  }, [user])
  return (
    <section className="login-page">
      <div className="inner">
        <div className="logo">
          <h4>SJ-Note</h4>
        </div>
        <div className="login">
          <div className="id">
            <span className="material-symbols-outlined">person</span>
            <input type="text" placeholder='아이디' onChange={(event) => setEmail((event.target.value))} />
          </div>
          <div className="password">
            <span className="material-symbols-outlined">lock</span>
            <input type="text" placeholder='비밀번호' onChange={(event) => setPassoword(event.target.value)} />
          </div>
          {/* <Link to={'/home'} > */}
          <button className="button-classic" onClick={login}>로그인</button>
          {/* </Link> */}
          <div className="find-wrap">
            <ul>
              <li>
                <Link to={'/id_find'}>
                  <a href="javascirpt:void(0)">아이디 찾기</a>
                </Link>
              </li>
              <li>
                <Link to={'/pw_find'}>
                  <a href="javascirpt:void(0)">비밀번호 찾기</a>
                </Link>
              </li>
              <li>
                <Link to={'/signup'}>
                  <a href="javascirpt:void(0)">회원가입</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>


      </div>
    </section>
  );
}
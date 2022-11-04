import "./PassWordChange.scss";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getAuth, deleteUser, updatePassword, signOut } from "firebase/auth";
import MyPageAni from "../../animation/MyPageAni";
import {
  firebaseAuth,
  firestore,
  signInWithEmailAndPassword,
} from "../../db/firebase";

export default function PassWordChange() {
  const user_email = useLocation();

  const [current_PW, setCurrentPW] = useState<string>("");
  const [new_PW, setNewPW] = useState<string>("");
  const [retry_PW, setRetryNewPW] = useState<string>("");
  const [DeletePage, setDeletePage] = useState<boolean>(false);
  const navigate = useNavigate();
  let check: boolean = false;
  const PassWordCompare = () => {
    if (new_PW.length !== 0 || retry_PW.length !== 0) {
      if (new_PW === retry_PW) {
        check = true;
      } else {
        alert("일치하지 않습니다");
      }
    }
  };

  const onClick = () => {
    setDeletePage((prop) => !prop);
  };
  const pwChange = async () => {
    try {
      const curUserInfo = await signInWithEmailAndPassword(
        firebaseAuth,
        user_email.state.email,
        current_PW
      );
      PassWordCompare();
      if (check) {
        const auth = getAuth();
        const user: any = auth.currentUser;
        updatePassword(user, new_PW);
        alert("변경 완료. 다시 로그인 해주세요");
        signOut(firebaseAuth);
        navigate("/");
      }
    } catch (err: any) {
      // alert("비밀번호가 일치하지 않습니다.");

      if (err.code === "auth/wrong-password") {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  };
  useEffect(() => {
    if (DeletePage) {
      navigate(-1);
    }
  }, [DeletePage]);

  return (
    <div className="password-change">
      <div className="change-box">
        <div className="inner">
          <div className="close" onClick={onClick}>
            <span className="material-symbols-outlined">close</span>
          </div>
          <div className="container">
            <div className="title">비밀번호 재설정</div>
            <h4>현재 비밀번호</h4>
            <div className="password-box">
              <input
                type="password"
                onChange={(event) => setCurrentPW(event.target.value)}
              />
              <span className="material-symbols-outlined">lock</span>
            </div>
            <h4>새로운 비밀번호</h4>
            <div className="password-box">
              <input
                type="password"
                onChange={(event) => setNewPW(event.target.value)}
              />
              <span className="material-symbols-outlined">lock</span>
            </div>
            <h4>재확인</h4>
            <div className="password-box">
              <input
                type="password"
                onChange={(event) => setRetryNewPW(event.target.value)}
              />
              <span className="material-symbols-outlined">lock</span>
            </div>
            <button className="button-classic" onClick={pwChange}>
              비밀번호 재설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

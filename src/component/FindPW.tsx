import './FindPW.scss';
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
export default function FindPW() {
  const [typingEmail, setTypingEmail] = useState<string>("");
  const changePasswordUsingEmail = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, typingEmail);
      alert("메일 확인 부탁드립니다.");
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        alert("등록되어 있지 않은 이메일입니다.");
      }
    }
  }
  return (
    <section className="find-pw">
      <div className="inner">
        <div className="logo">
          <Link to={'/'} >
            <h4>SJ.Community</h4>
          </Link>
        </div>


        <h4 className='title'>이메일</h4>
        <div className="container">
          <input type="text" onChange={(event) => setTypingEmail(event.target.value)} />
          <span className="material-symbols-outlined">person</span>
        </div>

        <button className="button-classic" onClick={changePasswordUsingEmail} >비밀번호 찾기</button>

      </div>
    </section>
  )
}
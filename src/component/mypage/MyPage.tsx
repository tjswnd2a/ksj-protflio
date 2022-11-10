import "./MyPage.scss";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  firebaseAuth,
  firestore,
  signInWithEmailAndPassword,
} from "../../db/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import MyPageAni from "../../animation/MyPageAni";
import { Placeholder } from "react-bootstrap";

export default function MyPage() {
  const location = useLocation();
  const [email, setEmail] = useState<string>(location.state.email);
  const [uid, setUid] = useState<string>(location.state.uid);
  const [password, setPassWord] = useState<string>("");
  const [DeletePage, setDeletePage] = useState<boolean>(false);

  const navigate = useNavigate();
  const onClick = () => {
    setDeletePage((prop) => !prop);
  };
  const UserDataDelete = async () => {
    const userCollectionRef = firestore.collection(email);
    const data = await getDocs(userCollectionRef);
    data.forEach((item) => {
      userCollectionRef.doc(item.id).delete();
    });
  };
  const UserListDelete = async () => {
    const userCollectionRef = firestore.collection("user");
    const data = await getDocs(userCollectionRef);
    data.forEach((item) => {
      if (item.data().id === email) {
        userCollectionRef.doc(item.id).delete();
      }
    });
  };
  const user_delete = async () => {
    try {
      const auth = getAuth();
      const user: any = auth.currentUser;
      const user_delete = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await deleteUser(user);
      UserDataDelete();
      UserListDelete();
      alert("회원이 탈퇴 되었습니다");
      navigate("/", { replace: true });
    } catch (err: any) {
      if (err.code === "auth/wrong-password") {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  };
  useEffect(() => {
    MyPageAni(DeletePage);
  }, [DeletePage]);

  const BackBtn = () => {
    navigate(-1);
  }
  return (
    <div className="my-page">
      <div className="inner">
        <h1>회원정보</h1>
        <div className="close" onClick={BackBtn}>
          <span className="material-symbols-outlined">close</span>
        </div>
        <div className="profile-box">
          <ul>
            <li className="title">내 프로필</li>
            <li className="email">이메일 - [{email}]</li>
            <li className="uid">UID - [{uid}] </li>
          </ul>
        </div>
        <div className="revise-box">
          <ul>
            <li className="title">정보수정</li>
            <Link to={"/PassWordChange"} state={{ email: email }}>
              <li className="pw-revise">비밀번호 재설정</li>
            </Link>

            <li className="user-delete" onClick={onClick}>
              탈퇴하기
            </li>
          </ul>
        </div>
      </div>

      <div className="delete-page">
        <div className="delete-box">
          <div className="inner">
            <div className="close" onClick={onClick}>
              <span className="material-symbols-outlined">close</span>
            </div>
            <div className="container">
              <div className="title">
                안녕하세요
                <br />
                {email}님 회원탈퇴를 하시겠습니까?
              </div>
              <div className="password-box">
                <input
                  type="password"
                  onChange={(event) => setPassWord(event.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                />
                <span className="material-symbols-outlined">lock</span>
              </div>
              <button className="button-classic" onClick={user_delete}>
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./Home.scss";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from "../db/firebase";
import HomeAni from "../animation/HomeAni";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

export default function Home() {
  const [user, setUser] = useState<any>({});
  const [menu_active, setMenuActive] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  useEffect(() => {
    if (menu_active) {
      HomeAni(menu_active);
    } else {
      HomeAni(menu_active);
    }
  }, [menu_active]);

  const onClick = () => {
    setMenuActive((prop) => !prop);
  }

  const logOut = async () => {
    await signOut(firebaseAuth);
    window.location.href = "/";

  }
  return (
    <div className="home">
      <div className="my-info">
        <div className="logo">
          <Link to={'/home'} >
            <h4>SJ-Note</h4>
          </Link>
        </div>
        <div className="title">
          {user.email}님 환영합니다.
        </div>
        <ul>
          <li>내정보</li>
          <li>내가 쓴 글</li>
          <li className="logout" onClick={logOut}>LogOut</li>

        </ul>
      </div>
      <div className="inner">
        <div className="menu" onClick={onClick}>
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th className="t-number">번호</th>
                <th className="t-title">제목</th>
                <th className="t-writer">작성자</th>
                <th className="t-date-create">작성일</th>
              </tr>
            </thead>
          </table>
        </div>
        <button className="button-classic">글쓰기</button>
      </div>

    </div >
  )
}
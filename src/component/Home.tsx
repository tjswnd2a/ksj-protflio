import "./Home.scss";
import { useEffect, useState } from "react";
import { onAuthStateChanged, onIdTokenChanged, signOut } from "firebase/auth";
import { firestore, firebaseAuth } from "../db/firebase";
import { collection, getDocs } from "firebase/firestore";
import HomeAni from "../animation/HomeAni";
import { Link } from "react-router-dom";
import TableBox from "./home/TableBox";

export default function Home() {
  const [user, setUser] = useState<any>({});
  const [menu_active, setMenuActive] = useState<boolean>(false);
  const [viewToggle, setViewToggle] = useState<boolean>(false);
  const [userID, setUserID] = useState<Array<any>>([]);
  const [data_load, setDataLoad] = useState<boolean>(false);

  const getUsers = async () => {
    const userCollectionRef = collection(firestore, "user");
    const userList: Array<string> = [];
    try {
      const data = await getDocs(userCollectionRef);
      data.forEach((doc: any) => {
        userList.push(doc.data().id);
      });
      setUserID(userList);
      setDataLoad(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    getUsers();
  }, []);

  useEffect(() => {
    console.log(userID);
  }, [userID]);

  useEffect(() => {
    if (menu_active) {
      HomeAni(menu_active);
    } else {
      HomeAni(menu_active);
    }
  }, [menu_active]);

  const onClick = () => {
    setMenuActive((prop) => !prop);
  };
  const Total_View = () => {
    setViewToggle(false);
    onClick();
  };
  const My_View = () => {
    setViewToggle(true);
    onClick();
  };

  const logOut = async () => {
    await signOut(firebaseAuth);
    window.location.href = "/";
  };

  return (
    <div className="home">
      <h1 className="title-logo">SJ.Community</h1>
      <div className="my-info">
        <div className="close" onClick={onClick}>
          <span className="material-symbols-outlined">close</span>
        </div>
        <div className="logo">
          <Link to={"/home"}>
            <h4>SJ.Community</h4>
          </Link>
        </div>
        <div className="title">{user.email}??? ???????????????.</div>
        <ul>
          <Link to={"/mypage"} state={{ email: user.email, uid: user.uid }}>
            <li>?????????</li>
          </Link>
          <li onClick={Total_View}>?????? ?????????</li>
          <li onClick={My_View}>?????? ??? ???</li>
          <li className="logout" onClick={logOut}>
            LogOut
          </li>
        </ul>
      </div>
      <div className="inner">
        <div className="menu" onClick={onClick}>
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div className="table-box">
          <ul className="table-header">
            <li className="t-number">??????</li>
            <li className="t-title">??????</li>
            <li className="t-writer">?????????</li>
            <li className="t-create">?????????</li>
          </ul>
          {viewToggle === true && data_load === true ? (
            <TableBox
              userList={userID}
              my_email={user.email}
              toggle={viewToggle}
            />
          ) : null}

          {viewToggle === false && data_load === true ? (
            <TableBox
              userList={userID}
              my_email={user.email}
              toggle={viewToggle}
            />
          ) : null}

          {data_load ? null : <div className="loading-box">loading...</div>}
        </div>

        {viewToggle ? null : (
          <Link
            to={"/writing-page"}
            state={{ uid: user.uid, email: user.email }}
          >
            <button className="button-classic">?????????</button>
          </Link>
        )}
      </div>
    </div>
  );
}

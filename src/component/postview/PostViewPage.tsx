import "./PostViewPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostViewPageAni from "../../animation/PostViewPageAni";
import { firestore } from "../../db/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
export default function PostViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);
  const [edit_title, setEditTitle] = useState<string>(location.state.p_title);
  const [edit_content, setPostContent] = useState<string>(location.state.p_content);
  console.log(location.state.p_key);
  const closeClick = () => {
    navigate(-1);
  }

  const Btn_Edit = () => {
    setToggle((prop) => !prop);
  }
  const Btn_Edit_Success = () => {
    setToggle((prop) => !prop);
    PostUpDate();
  }
  useEffect(() => {
    PostViewPageAni(toggle);
  }, [toggle])

  const PostUpDate = async () => {
    const userDoc = doc(firestore, location.state.email, location.state.p_key);
    const newField = { content: edit_content, title: edit_title };
    if (edit_title === "") {
      alert("제목란이 비어 있습니다.");
    }
    if (edit_content === "") {
      alert("내용이 비어져 있습니다");
    }
    await updateDoc(userDoc, newField);
  }
  const Btn_Delete = () => {
    const userCollectionRef = firestore.collection(location.state.email);
    userCollectionRef.doc(location.state.p_key).delete();
    alert("삭제되었습니다");
    navigate(-1);

  }
  return (
    <div className="post-page-view">
      <div className="inner">
        <div className="close" onClick={closeClick}>
          <span className="material-symbols-outlined">close</span>
        </div>
        <div className="post-container">
          <div className="title-box">
            {toggle ?
              <input type="text" onChange={(event) => setEditTitle(event.target.value)} value={edit_title} />
              : <div className="title" >{edit_title}</div>}
            <div className="write-time">{location.state.p_create}</div>
          </div>
          <div className="user-box">
            <div className="user">{location.state.p_writer}</div>
            {location.state.p_writer === location.state.email ?
              <div className="post-edit">
                <button className="edit" onClick={Btn_Edit}>수정</button>
                <button className="edit-success" onClick={Btn_Edit_Success}>수정완료</button>
                <button className="delete" onClick={Btn_Delete}>삭제</button>
              </div>
              : null}
          </div>
          <div className="content">
            {toggle ? <textarea onChange={(event) => setPostContent(event.target.value)} >{edit_content}</textarea>
              : <textarea readOnly>{edit_content}</textarea>}
          </div>
        </div>
      </div>
    </div>
  )
}
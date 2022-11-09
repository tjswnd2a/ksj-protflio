import "./PostViewPage.scss";
import { useNavigate } from "react-router-dom";
export default function PostViewPage() {
  const navigate = useNavigate();
  const closeClick = () => {
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
            <div className="title">제목입니다.</div>
            <div className="write-time">작성 시간</div>
          </div>
          <div className="user-box">
            <div className="user">작성자</div>
          </div>
          <div className="content">
            <textarea readOnly>읽기 전용입니다.</textarea>
          </div>
        </div>
      </div>
    </div>
  )
}
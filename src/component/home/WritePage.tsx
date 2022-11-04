import "./WritePage.scss";
import { useRef, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore } from "../../db/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function WritePage() {
  const location = useLocation();
  const textRef = useRef<any>(null);
  const [post_title, setPostTitle] = useState<string>("");
  const [post_content, setPostContent] = useState<string>("");
  const [user_uid, setUid] = useState<string>("");
  const [user_email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = "38px";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);
  const CurrentTime = (): string => {
    const now = new Date();
    const year: number = now.getFullYear(); // 연도
    const todayMonth: number = now.getMonth() + 1; // 월
    const todayDate: number = now.getDate(); // 일
    const hours: number = now.getHours(); // 시간
    const minutes: number = now.getMinutes(); // 분
    const sec: number = now.getSeconds(); //시간

    const result: string = `${year}-${todayMonth}-${todayDate} ${hours}:${minutes}:${sec}`;
    return result;
  };
  const onClick = async () => {
    const userCollectionRef = collection(firestore, location.state.uid);
    try {
      const res = await addDoc(userCollectionRef, {
        title: post_title,
        content: post_content,
        user: location.state.email,
        uid: location.state.uid,
        time: CurrentTime(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(firestore);

    setUid(location.state.uid);
    setEmail(location.state.email);
  }, []);
  console.log(post_title);
  return (
    <div className="write-page">
      <div className="inner">
        <div className="title">
          <h4>제목</h4>
          <div className="container">
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              onChange={(event: any) => setPostTitle(event.target.value)}
            />
          </div>
        </div>
        <div className="write-box">
          <h4>글 쓰기</h4>
          <textarea
            ref={textRef}
            onChange={(event: any) => setPostContent(event.target.value)}
            onInput={handleResizeHeight}
          ></textarea>
        </div>
        <button className="button-classic" onClick={onClick}>
          작성 완료
        </button>
      </div>
    </div>
  );
}
import "./TableBox.scss";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore, firebaseAuth } from "../../db/firebase";

export default function TableBox({ userList }: { userList: Array<string> }) {
  const [postContent, setPostContent] = useState<Array<any>>([]);
  const [load, setload] = useState<boolean>(false);
  let post_counter: number = 0;

  const Table_Data = () => {
    post_counter += 1;
    return (
      <tr>
        <td className="data-number">{post_counter}</td>
        <td className="data-title">aaaa</td>
        <td className="data-writer">aaaa</td>
        <td className="data-create">aaaa</td>
      </tr>
    );
  };
  const SearchUser = () => {
    console.log("bbbbbbbbbbbb");

    userList.forEach(async (item) => {
      const userCollectionRef = collection(firestore, item);
      console.log(item);

      const user_data: Array<any> = [];
      const data = await getDocs(userCollectionRef);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");

      data.forEach((doc: any) => {
        console.log(doc.data());

        user_data.push(doc.data());
      });
      console.log(user_data);
      setPostContent({ ...user_data });
    });
    setload(true);
  };
  useEffect(() => {
    SearchUser();
    // userList.forEach((item) =>{
    //   const userCollectionRef = collection(firestore, item);
    //   const user_data: Array<any> = [];
    //   const data = await getDocs(userCollectionRef);
    // })
  }, []);

  useEffect(() => {
    console.log(postContent);
  }, [postContent]);
  return (
    <div className="table-box">
      <table>
        <thead>
          <tr>
            <th className="t-number">번호</th>
            <th className="t-title">제목</th>
            <th className="t-writer">작성자</th>
            <th className="t-create">작성일</th>
          </tr>
        </thead>
        {load ? <tbody> {Table_Data()}</tbody> : null}
      </table>
    </div>
  );
}

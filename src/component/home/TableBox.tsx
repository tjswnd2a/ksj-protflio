import "./TableBox.scss";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore, firebaseAuth } from "../../db/firebase";

export default function TableBox({ userList }: { userList: Array<string> }) {
  const [postContent, setPostContent] = useState<Array<any>>([]);
  const [load, setload] = useState<boolean>(false);
  let post_counter: number = 0;
  const [counter, setCounter] = useState<number>(0);
  const regex: RegExp = /[^0-9]/g; //숫자만 찾게 하는 정규표현식

  const Table_Data = (title: string, user: string, time: string) => {
    post_counter += 1;
    console.log(user);

    return (
      <tr>
        <td className="data-number">{post_counter}</td>
        <td className="data-title">{title}</td>
        <td className="data-writer">{user}</td>
        <td className="data-create">{time}</td>
      </tr>
    );
  };
  const SearchUser = async () => {
    const user_data: Array<any> = [];
    for (let i = 0; i < userList.length; i++) {
      const userCollectionRef = collection(firestore, userList[i]);
      const data = await getDocs(userCollectionRef);
      data.forEach((doc: any) => {
        user_data.push(doc.data());
      });
      setCounter((pops) => pops += 1);
    }
    PostTimeSort(user_data);
  };

  useEffect(() => {
    SearchUser();

  }, []);


  useEffect(() => {
    console.log("길이:" + userList.length);
    console.log("counter" + counter);
    setload(true);
  }, [postContent]);
  useEffect(() => {
  }, [counter]);
  const PostTimeSort = (user_data: Array<any>) => {
    let item1: number = 0;
    let item2: number = 0;
    let temp: any = null;

    for (let i = 0; i < user_data.length - 1; i++) {
      for (let j = i; j < user_data.length; j++) {
        item1 = Number(user_data[i].time.replace(regex, ""));
        item2 = Number(user_data[j].time.replace(regex, ""));
        console.log(item1);
        console.log(item2);
        if (item1 < item2) {
          temp = user_data[i];
          user_data[i] = user_data[j];
          user_data[j] = temp;
        }
      }
    }
    setPostContent(user_data);
  };
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
        <tbody>
          {load ? postContent.map((item) => (
            Table_Data(item.title, item.user, item.time)
          )) : null}
        </tbody>
      </table>
    </div>
  );
}

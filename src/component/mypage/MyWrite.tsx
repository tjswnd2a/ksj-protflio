import "./MyWrite.scss";

export default function MyWrite() {
  return (
    <div className="my-write">
      <div className="inner">
        <div className="menu">
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
      </div>
    </div>
  );
}
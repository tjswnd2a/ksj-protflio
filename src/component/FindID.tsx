import './FindID.scss';
import { Link } from "react-router-dom";

export default function FindID() {
  return (
    <section className="find-id">
      <div className="inner">
        <div className="logo">
          <Link to={'/'} >
            <h4>SJ-Note</h4>
          </Link>
        </div>

        <h4 className='title'>닉네임</h4>
        <div className="container">
          <input type="text" />
        </div>

        <h4 className='title'>전화번호</h4>
        <div className="container">
          <input type="text"
            maxLength={11}
            placeholder='-를 제외한 전화번호 11자리를 입력해주세요'
          />
          <span className="material-symbols-outlined">call</span>
        </div>

        <button className="button-classic">아이디 찾기</button>

      </div>
    </section>
  )
}
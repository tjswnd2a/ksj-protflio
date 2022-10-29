import './LoginPage.scss';
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <section className="login-page">
      <div className="inner">
        <div className="logo">
          <h4>SJ-Note</h4>
        </div>
        <div className="login">
          <div className="id">
            <span className="material-symbols-outlined">person</span>
            <input type="text" placeholder='아이디' />
          </div>
          <div className="password">
            <span className="material-symbols-outlined">lock</span>
            <input type="text" placeholder='비밀번호' />
          </div>
          <button className="button-classic">로그인</button>
          <div className="find-wrap">
            <ul>
              <li>
                <Link to={'/id_find'}>
                  <a href="javascirpt:void(0)">아이디 찾기</a>
                </Link>
              </li>
              <li>
                <Link to={'/pw_find'}>
                  <a href="javascirpt:void(0)">비밀번호 찾기</a>
                </Link>
              </li>
              <li>
                <Link to={'/signup'}>
                  <a href="javascirpt:void(0)">회원가입</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
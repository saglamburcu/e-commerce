import "./Signup.scss";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const Signup = () => {
  const [clickItem, setClickItem] = useState("Giriş Yap");

  const handleClick = (e) => {
    setClickItem(e.target.textContent);
  }

  return (
    <div className="signup">
      <div onClick={(e) => handleClick(e)} className="signup__buttons">
        <div className={clickItem === "Giriş Yap" ? "signup__buttons__item select" : "signup__buttons__item"}>Giriş Yap</div>
        <div className={clickItem === "Kayıt Ol" ? "signup__buttons__item select" : "signup__buttons__item"}>Kayıt Ol</div>
      </div>
      <div className="signup__forms">
        {
          clickItem === "Giriş Yap" ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )
        }
      </div>
    </div>
  )
}

export default Signup;
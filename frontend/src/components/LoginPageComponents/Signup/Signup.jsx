import "./Signup.scss";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const Signup = () => {
  const [clickItem, setClickItem] = useState("LOGIN");

  const handleClick = (e) => {
    setClickItem(e.target.textContent);
  }

  return (
    <div className="signup">
      <div onClick={(e) => handleClick(e)} className="signup__buttons">
        <div className={clickItem === "LOGIN" ? "signup__buttons__item select" : "signup__buttons__item"}>LOGIN</div>
        <div className={clickItem === "REGISTER" ? "signup__buttons__item select" : "signup__buttons__item"}>REGISTER</div>
      </div>
      <div className="signup__forms">
        {
          clickItem === "LOGIN" ? (
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
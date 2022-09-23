import "./LoginForm.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlockKeyhole} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import { fetchLoginUser } from "../../api";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetchLoginUser(email, password);
  }

  return (
    <form className="loginform" onSubmit={(e) => handleLogin(e)}>
      <div className="loginform__email">
        <span className="loginform__email__icon">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input 
          className="loginform__email__input" 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="loginform__password">
        <span className="loginform__password__icon">
          <FontAwesomeIcon icon={faUnlockKeyhole} />
        </span>
        <input 
          className="loginform__password__input" 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="loginform__button" type="submit">Login</button>
    </form>
  )
}

export default LoginForm;
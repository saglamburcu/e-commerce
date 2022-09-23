import "./RegisterForm.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlockKeyhole, faFaceSmile} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons"
import { useState } from "react";
import { fetchRegisterUser } from "../../api";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    fetchRegisterUser(name, email, password);
  }
  return (
    <form className="registerform" onSubmit={(e) => handleRegister(e)}>
      <div className="registerform__name">
        <span className="registerform__name__icon">
          <FontAwesomeIcon icon={faFaceSmile} />
        </span>
        <input 
          className="registerform__name__input" 
          type="text" 
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="registerform__email">
        <span className="registerform__email__icon">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input 
          className="registerform__email__input" 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="registerform__password">
        <span className="registerform__password__icon">
          <FontAwesomeIcon icon={faUnlockKeyhole} />
        </span>
        <input 
          className="registerform__password__input" 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
      </div>

      <button className="registerform__button" type="submit">Register</button>
    </form>
  )
}

export default RegisterForm;
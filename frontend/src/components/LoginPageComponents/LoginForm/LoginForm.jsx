import "./LoginForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { fetchLoginUser } from "../../../api";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Error from "../../Error/Error";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const [isNotification, setIsNotification] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchLoginUser(email, password);

      if (!response.success) {
        setIsNotification(true);

        setTimeout(() => {
          setIsNotification(false);
        }, 6000);

        return;
      }

      login(response);
      navigate("/", { replace: true });

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="loginform" onSubmit={handleLogin}>

      {isNotification && (
        <Error
          status="error"
          message="Böyle bir kullanıcı bulunamadı. Email ve parolanızı kontrol ediniz" />
      )}

      <div className="loginform__email">
        <div className="loginform__email__value">
          <span className="loginform__email__value__icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            className="loginform__email__value__input"
            type="email"
            placeholder="E-Mail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="loginform__password">
        <div className="loginform__password__value">
          <span className="loginform__password__value__icon">
            <FontAwesomeIcon icon={faUnlockKeyhole} />
          </span>
          <input
            className="loginform__password__value__input"
            type="password"
            placeholder="Parola"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button className="loginform__button" type="submit">Giriş Yap</button>

      <div className="loginform__forgot__password">
        <Link to="/forgot/password" className="loginform__forgot__password__link">
          Parolamı unuttum
        </Link>
      </div>

    </form>
  )
}

export default LoginForm;
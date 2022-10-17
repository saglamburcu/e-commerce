import "./ForgotPassword.scss";
import { useState } from "react";
import { fetchForgotPassword } from "../../../api";
import Error from "../../Error/Error";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [infoMessage, setInfoMessage] = useState({ status: "", message: "" });
  const [isNotification, setIsNotification] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    const res = await fetchForgotPassword(email);

    if (res.success) {
      setIsNotification(true);

      setInfoMessage({
        status: "successInfo",
        message: `${email} adresinizi kontrol ediniz.`
      });
    } else {
      setIsNotification(true);

      setInfoMessage({
        status: "error",
        message: "Böyle bir kullanıcı bulunamadı"
      })
    }

    setTimeout(() => {
      setIsNotification(false);
    }, 6000);
  }

  return (
    <div className="forgot__password">
      <div className="forgot__password__form">
        {
          isNotification && <Error status={infoMessage.status} message={infoMessage.message} />
        }
        <h3>Şifremi Unuttum</h3>
        <form onSubmit={resetPassword}>
          <input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">Şifremi Yenile</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;
import "./ResetPassword.scss";
import { useState } from "react";
import { useParams, navigate, useNavigate } from "react-router-dom";
import { fetchResetPassword } from "../../../api";
import Error from "../../Error/Error";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState({status: "", message: ""});
  const [isNotification, setIsNotification] = useState(false);
  const navigate = useNavigate();

  const {token} = useParams();

  const changePassword = async (e) => {
    e.preventDefault();

    const res = await fetchResetPassword(token, password, confirmPassword);

    if (res.success) {
      setIsNotification(true);

      setInfoMessage({
        status: "successInfo",
        message: "Şifreniz başarıyla güncellendi"
      })
    } else {
      setIsNotification(true);

      setInfoMessage({
        status: "error",
        message: "Parolalar eşleşmiyor veya linkin süresi geçmiş olabilir"
      })
    }

    setTimeout(() => {
      setIsNotification(false);
    }, 4000);
  }

  const turnBackToLogin = () => {
    navigate("/login");
  } 

  return (
    <div className="reset__password">
      <form onSubmit={changePassword} className="reset__password__form">
        {
          isNotification && <Error status={infoMessage.status} message={infoMessage.message} />
        }
        <div className="reset__password__new">
          <label>Yeni Şifreniz</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="reset__password__confirm">
          <label>Yeni Şifreniz (Tekrar)</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <button className="reset__password__updateButton" type="submit">Güncelle</button>
        {
          infoMessage.status === "successInfo" && <button className="reset__password__turnBackButton" type="button" onClick={turnBackToLogin}>Geri Dön</button>
        }
      </form>
    </div>
  )
}

export default ResetPassword;
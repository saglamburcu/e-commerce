import { useState } from "react";
import { fetchUpdatePassword } from "../../../api";
import Error from "../../Error/Error";
import "./ChangePassword.scss";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNotification, setIsNotification] = useState(false);
  const [infoMessage, setInfoMessage] = useState({ status: "", message: "" });

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchUpdatePassword(oldPassword, newPassword, confirmPassword);
      console.log(response)

      if (!response.success) {
        setIsNotification(true);
        setInfoMessage({ status: "error", message: response.message });

      } else {
        setIsNotification(true);
        setInfoMessage({ status: "successInfo", message: "Parolanız Güncellendi" });
      }

      setTimeout(() => {
        setIsNotification(false);
      }, 4000);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="change__password">
      {
        isNotification &&
        <div className="change__password__message">
          <Error status={infoMessage.status} message={infoMessage.message} />
        </div>
      }
      <form className="change__password__form" onSubmit={changePassword}>
        <label>Şifreniz</label>
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />

        <label>Yeni Şifre</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

        <label>Yeni Şifre (Tekrar) </label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button type="submit">Güncelle</button>
      </form>
    </div>
  )
}

export default ChangePassword;
import { useState } from "react";
import { fetchUpdatePassword } from "../../../api";
import Error from "../../Error/Error";
import "./ChangePassword.scss";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNotification, setIsNotification] = useState({state: false, message: ""});

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchUpdatePassword(oldPassword, newPassword, confirmPassword);
      console.log(response)

      if (!response.success) {
        setIsNotification({state: true, message: response.message});

        setTimeout(() => {
          setIsNotification({state: false, message: ""});
        }, 4000);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="change__password">
      {
        isNotification.state && <Error status="error" message={isNotification.message} />
      }
      <form className="change__password__form" onSubmit={changePassword}>
        <label>Şifreniz</label>
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>

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
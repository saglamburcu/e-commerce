import "./UserInfos.scss";
import { useState, useEffect, useContext } from "react";
import { fetchUserDetails, fetchUpdateUserInfo } from "../../../api";
import { UserContext } from "../../../context/UserContext";
import Error from "../../Error/Error";

const UserInfos = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isNotification, setIsNotification] = useState({ state: false, message: "" });

  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const userInfo = await fetchUserDetails();
      setUserDetails(userInfo);
    })()
  }, []);

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name)
      setEmail(userDetails.email)
    }
  }, [userDetails])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchUpdateUserInfo({ name, email });
    setUserInfo(prev => ({ ...prev, name, email }));

    setIsNotification({ state: true, message: "Bilgileriniz başarıyla güncellendi" });

    setTimeout(() => {
      setIsNotification({ state: false, message: "" })
    }, 5000);
  }

  return (
    <div className="user__infos">
      <div className="user__infos__message">
        {
          isNotification.state && <Error status="successInfo" message={isNotification.message} />
        }
      </div>
      <form className="user__infos__form" onSubmit={handleSubmit}>
        <label htmlFor="userName">Ad</label>
        <input id="userName" type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email">E-Mail</label>
        <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button type="submit">Güncelle</button>
      </form>
    </div>
  )
}

export default UserInfos;
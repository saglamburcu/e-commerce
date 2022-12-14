import "./UserInfos.scss";
import { useState, useEffect, useContext } from "react";
import { fetchUserDetails, fetchUpdateUserInfo } from "../../../api";
import { UserContext } from "../../../context/UserContext";
import Loading from "../../Loading/Loading";

const UserInfos = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const userInfo = await fetchUserDetails();
      setUserDetails(userInfo);

      setTimeout(() => {
        setIsLoading(false);
      }, 750);
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

    setIsUpdate(true);
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="user__infos">
      <form className="user__infos__form" onSubmit={handleSubmit}>
        <label htmlFor="userName">Ad</label>
        <input id="userName" type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email">E-Mail</label>
        <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button className={isUpdate ? "updated" : ""} type="submit">
          {isUpdate ? "Güncellendi" : "Güncelle"}
        </button>
      </form>
    </div>
  )
}

export default UserInfos;
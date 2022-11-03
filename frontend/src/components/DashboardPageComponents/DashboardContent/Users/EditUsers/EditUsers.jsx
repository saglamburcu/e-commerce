import "./EditUsers.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGetSingleUser, fetchUpdateUserRole } from "../../../../../api";

const EditUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetchGetSingleUser(id);
      setName(res.user.name);
      setEmail(res.user.email);
      setRole(res.user.role);
    })()
  }, []);

  const changeUserRole = async (e) => {
    e.preventDefault();
    const data = { name, email, role };
    const res = await fetchUpdateUserRole(id, data);

    if (res.success) {
      setIsUpdated(true);
    }
  }

  return (
    <div className="edit__user">
      <form className="edit__user__form" onSubmit={changeUserRole}>
        <div className="edit__user__form__name">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="edit__user__form__email">
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="edit__user__form__role">
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>

        <button type="submit" className={isUpdated ? "edit__user__form__updateButton updated" : "edit__user__form__updateButton"}>
          {isUpdated ? "Güncellendi" : "Güncelle"}
        </button>
      </form>
    </div>
  )
}

export default EditUsers;
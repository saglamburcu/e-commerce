import "./Users.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { fetchAllUsers, fetchDeleteUser } from "../../../../api";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetchAllUsers();
      setAllUsers(res.users);
    })()
  }, [deleteUserId]);

  const deleteUser = async (userId) => {
    await fetchDeleteUser(userId);
    setDeleteUserId(userId);
  }

  return (
    <div className="all__users">
      <table className="all__users__list">
        <tr>
          <th>Kullanıcı ID</th>
          <th>E-mail</th>
          <th>İsim</th>
          <th>Rol</th>
          <th>Sil</th>
          <th>Düzenle</th>
        </tr>

        {
          allUsers.map(user => {
            const { _id, email, name, role } = user;

            return (
              <tr>
                <td>{_id}</td>
                <td>{email}</td>
                <td>{name}</td>
                <td>{role}</td>
                <td>
                  <button onClick={() => deleteUser(_id)}>
                    <RiDeleteBin5Fill />
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/dashboard/edit-user/${_id}`)}>
                    <RiEdit2Fill />
                  </button>
                </td>
              </tr>
            )
          })
        }
      </table>
    </div>
  )
}

export default Users;
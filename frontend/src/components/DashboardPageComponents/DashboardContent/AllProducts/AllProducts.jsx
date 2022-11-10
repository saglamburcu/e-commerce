import "./AllProducts.scss";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDeleteProduct } from "../../../../api";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import Loading from "../../../Loading/Loading";
import { AdminContext } from "../../../../context/AdminContext";
import Spinner from "../../../Spinner/Spinner";

const AllProducts = () => {
  const { isLoading, allProducts, setDeleteProductId } = useContext(AdminContext);
  const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    await fetchDeleteProduct(id);
    setDeleteProductId(id);
    setIsDeleted(true);

    setTimeout(() => {
      setIsDeleted(false);
    }, 2000);
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="all__products">
      {
        allProducts.length ?
          <table className="all__products__list">
            <tr>
              <th>Ürün ID</th>
              <th>Ürün İsmi</th>
              <th>Stok</th>
              <th>Fiyat</th>
              <th>Sil</th>
              <th>Düzenle</th>
            </tr>

            {
              allProducts.map(product => {
                const { _id, name, stock, price } = product;

                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{stock}</td>
                    <td>{price}</td>
                    <td>
                      <button onClick={() => deleteProduct(_id)}>
                        <RiDeleteBin5Fill />
                      </button>
                    </td>
                    <td>
                      <button onClick={() => navigate(`/dashboard/edit-product/${_id}`)}>
                        <RiEdit2Fill />
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </table> :
          <p>Ürün Bulunamadı</p>
      }
      {
        isDeleted && <Spinner />
      }
    </div>
  )
}

export default AllProducts;
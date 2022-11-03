import "./AllProducts.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProductsAdmin, fetchDeleteProduct } from "../../../../api";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import Loading from "../../../Loading/Loading";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteProductId, setDeleteProductId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetchAllProductsAdmin();
      setAllProducts(res.products);
      setIsLoading(false);
    })()
  }, [deleteProductId]);

  const deleteProduct = async (id) => {
    await fetchDeleteProduct(id);
    setDeleteProductId(id);
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="all__products">
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
              <tr>
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
      </table>
    </div>
  )
}

export default AllProducts;
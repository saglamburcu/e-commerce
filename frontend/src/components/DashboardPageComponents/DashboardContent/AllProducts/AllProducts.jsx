import "./AllProducts.scss";
import { useEffect, useState } from "react";
import { fetchAllProductsAdmin } from "../../../../api";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchAllProductsAdmin();
      setAllProducts(res.products)
    })()
  }, [allProducts])

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
                  <RiDeleteBin5Fill />
                </td>
                <td>
                  <RiEdit2Fill />
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
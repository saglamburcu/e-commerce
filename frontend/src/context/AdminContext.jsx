import { useState, createContext, useEffect } from "react";
import { fetchAllProductsAdmin, fetchAllUsers, fetchGetAllOrders } from "../api";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [deleteProductId, setDeleteProductId] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteOrderId, setDeleteOrderId] = useState("");

  const [isUpdated, setIsUpdated] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [isUpdatedOrder, setIsUpdatedOrder] = useState(false);
  const [isUpdatedUser, setIsUpdatedUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetchAllProductsAdmin();
      setAllProducts(res.products);
      setIsAddProduct(false);

      setTimeout(() => {
        setIsUpdated(false);
      }, 3000);

      setIsLoading(false);
    })()
  }, [deleteProductId, isUpdated, isAddProduct]);

  useEffect(() => {
    (async () => {
      const res = await fetchAllUsers();
      setAllUsers(res.users);

      setTimeout(() => {
        setIsUpdatedUser(false);
      }, 3000);

      setIsLoading(false);
    })()
  }, [deleteUserId, isUpdatedUser]);

  useEffect(() => {
    (async () => {
      const res = await fetchGetAllOrders();
      setAllOrders(res.orders);

      setTimeout(() => {
        setIsUpdatedOrder(false);
      }, 3000);

      setIsLoading(false);
    })()
  }, [deleteOrderId, isUpdatedOrder]);

  const values = {
    allProducts,
    setAllProducts,
    allOrders,
    setAllOrders,
    allUsers,
    setAllUsers,
    isLoading,
    setDeleteProductId,
    setDeleteUserId,
    setDeleteOrderId,
    isUpdated,
    setIsUpdated,
    isAddProduct,
    setIsAddProduct,
    isUpdatedOrder,
    setIsUpdatedOrder,
    isUpdatedUser,
    setIsUpdatedUser
  }

  return (
    <AdminContext.Provider value={values}>
      {children}
    </AdminContext.Provider>
  )
}

export {
  AdminContext,
  AdminProvider
}
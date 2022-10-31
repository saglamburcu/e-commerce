import "./DashboardPanel.scss";
import { Link, Outlet } from "react-router-dom";
import { HiSquares2X2, HiOutlineClipboardDocumentList, HiUsers } from "react-icons/hi2";
import { BsListStars, BsPlusLg } from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";

const DashboardPanel = () => {
  return (
    <>
      <div className="dashboard__panel">
        <Link to="/" className="dashboard__panel__logo">
          <img src="/images/logo.jpg" alt="logo" />
        </Link>
        <Link to="/dashboard" className="dashboard__panel__main">
          <HiSquares2X2 className="dashboard__panel__icon" />
          <h4>Dashboard</h4>
        </Link>
        <Link to="/dashboard/products" className="dashboard__panel__products">
          <BsListStars className="dashboard__panel__icon" />
          <h4>All Products</h4>
        </Link>
        <Link to="/dashboard/create-product" className="dashboard__panel__createproduct">
          <BsPlusLg className="dashboard__panel__icon" />
          <h4>Create Product</h4>
        </Link>
        <Link to="/dashboard/orders" className="dashboard__panel__orders">
          <HiOutlineClipboardDocumentList className="dashboard__panel__icon" />
          <h4>Orders</h4>
        </Link>
        <Link to="/dashboard/users" className="dashboard__panel__users">
          <HiUsers className="dashboard__panel__icon" />
          <h4>Users</h4>
        </Link>
        <Link to="/dashboard/reviews" className="dashboard__panel__reviews">
          <MdOutlineRateReview className="dashboard__panel__icon" />
          <h4>Reviews</h4>
        </Link>
      </div>
      <Outlet />
    </>
  )
}

export default DashboardPanel;
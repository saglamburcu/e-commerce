import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../src/components/HomePageComponents/Header/Header';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Login from './pages/Login/Login';
import Account from './pages/Account/Account';
import UserInfos from './components/AccountPageComponents/UserInfos/UserInfos';
import MyOrders from './components/AccountPageComponents/MyOrders/MyOrdersList/MyOrdersList';
import Basket from './pages/Basket/Basket';
import Checkout from './pages/Checkout/Checkout';
import ShippingAddress from './components/CheckoutPageComponents/ShippingAddress/ShippingAddress';
import OrderConfirm from './components/CheckoutPageComponents/OrderConfirm/OrderConfirm';
import Success from './components/CheckoutPageComponents/Success/Success';
import Favorites from './pages/Favorites/Favorites';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import ChangePassword from './components/AccountPageComponents/ChangePassword/ChangePassword';
import ForgotPassword from './components/LoginPageComponents/ForgotPassword/ForgotPassword';
import ResetPassword from './components/LoginPageComponents/ResetPassword/ResetPassword';
import Products from './pages/Products/Products';
import Search from './pages/Search/Search';
import ProtectedRoute from './pages/Login/ProtectedRoute';
import ProtectedRouteAdmin from './pages/Login/ProtectedRouteAdmin';
import Dashboard from './pages/Dashboard/Dashboard';
import AllProducts from './components/DashboardPageComponents/DashboardContent/AllProducts/AllProducts';
import DashboardMain from './components/DashboardPageComponents/DashboardContent/DashBoardMain/DashboardMain';
import CreateProduct from './components/DashboardPageComponents/DashboardContent/CreateProduct/CreateProduct';
import EditProduct from './components/DashboardPageComponents/DashboardContent/AllProducts/EditProduct/EditProduct';
import Orders from './components/DashboardPageComponents/DashboardContent/Orders/Orders';
import Users from './components/DashboardPageComponents/DashboardContent/Users/Users';
import Reviews from './components/DashboardPageComponents/DashboardContent/Reviews/Reviews';
import EditOrders from './components/DashboardPageComponents/DashboardContent/Orders/EditOrders/EditOrders';
import EditUsers from './components/DashboardPageComponents/DashboardContent/Users/EditUsers/EditUsers';
// import Payment from './components/CheckoutPageComponents/Payment/Payment';
// import PaymentWrapper from './components/CheckoutPageComponents/Payment/PaymentWrapper';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Header />}>
          <Route index={true} element={<Home />} />
          <Route path='product/:id' element={<ProductDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path='account' element={<Account />} >
              <Route path='user-infos' element={<UserInfos />} />
              <Route path='my-orders' element={<MyOrders />} />
              <Route path='change-password' element={<ChangePassword />} />
            </Route>
            <Route path='/basket' element={<Basket />} />
            <Route path='/favorites' element={<Favorites />} />
          </Route>
          <Route path='products' element={<Products />} />
          <Route path='search' element={<Search />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/forgot/password' element={<ForgotPassword />} />
        <Route path='/reset/password/:token' element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/checkout' element={<Checkout />}>
            <Route path='shipping-address' element={<ShippingAddress />} />
            <Route path='order-confirm' element={<OrderConfirm />} />
            {/* <Route path='card-infos' element={<PaymentWrapper />} /> */}
            <Route path='success' element={<Success />} />
          </Route>
          <Route path='/order/:id' element={<OrderDetails />} />
        </Route>

        <Route element={<ProtectedRouteAdmin />}>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path="" element={<DashboardMain />} />
            <Route path='products' element={<AllProducts />} />
            <Route path='edit-product/:id' element={<EditProduct />} />
            <Route path='create-product' element={<CreateProduct />} />
            <Route path='orders' element={<Orders />} />
            <Route path='edit-order/:id' element={<EditOrders />} />
            <Route path='users' element={<Users />} />
            <Route path='edit-user/:id' element={<EditUsers />} />
            <Route path='reviews' element={<Reviews />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>


  );
}

export default App;

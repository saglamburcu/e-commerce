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
// import Payment from './components/CheckoutPageComponents/Payment/Payment';
// import PaymentWrapper from './components/CheckoutPageComponents/Payment/PaymentWrapper';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Header />}>
          <Route index={true} element={<Home />} />
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path='account' element={<Account />} >
            <Route path='user-infos' element={<UserInfos />} />
            <Route path='my-orders' element={<MyOrders />} />
            <Route path='change-password' element={<ChangePassword />} />
          </Route>
          <Route path='/basket' element={<Basket />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='products' element={<Products />} />
          <Route path='search' element={<Search />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/forgot/password' element={<ForgotPassword />} />
        <Route path='/reset/password/:token' element={<ResetPassword />} />

        <Route path='/checkout' element={<Checkout />}>
          <Route path='shipping-address' element={<ShippingAddress />} />
          <Route path='order-confirm' element={<OrderConfirm />} />
          {/* <Route path='card-infos' element={<PaymentWrapper />} /> */}
          <Route path='success' element={<Success />} />
        </Route>

        <Route path='/order/:id' element={<OrderDetails />} />
        {/* <Route path='/login' element={
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        } /> */}

      </Routes>
    </BrowserRouter>


  );
}

export default App;

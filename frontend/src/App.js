import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../src/components/HomePageComponents/Header/Header';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Login from './pages/Login/Login';
import Account from './pages/Account/Account';
import UserInfos from './components/AccountPageComponents/UserInfos/UserInfos';
import MyOrders from './components/AccountPageComponents/MyOrders/MyOrdersList/MyOrdersList';
import MyBasket from './components/BasketPageComponents/MyBasket/MyBasket';

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
          </Route>
          <Route path='/basket' element={<MyBasket />} />
        </Route>

        <Route path='/login' element={<Login />} />
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

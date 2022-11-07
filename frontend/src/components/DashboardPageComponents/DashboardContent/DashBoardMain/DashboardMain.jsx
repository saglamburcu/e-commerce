import "./DashboardMain.scss";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../../../../context/AdminContext";
import { Line, Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const DashboardMain = () => {
  const { allProducts, allOrders, allUsers } = useContext(AdminContext);

  console.log(allProducts)
  let outOfStock = 0;
  allProducts.map(product => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  })

  let totalAmount = 0;
  totalAmount = allOrders.reduce((cumulative, item) => cumulative + item.totalPrice, 0);

  const lineState = {
    labels: ["Başlangıç Miktarı", "Toplam Kazanç"],
    datasets: [
      {
        label: "Toplam Kazanç",
        backgroundColor: ["#F6688E"],
        hoverBackgroundColor: ["#F6688E"],
        data: [0, totalAmount],
      }
    ]
  };

  const doughnutState = {
    labels: ["Stoğu Tükenen", "Stokta"],
    datasets: [
      {
        backgroundColor: ["#F6688E", "#F19E8E"],
        hoverBackgroundColor: ["#805B87", "#FDB147"],
        data: [outOfStock, allProducts.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard__summary">
      <div className="dashboard__summary__totalAmount">
        <p>
          Toplam Kazanç:
          <span>{totalAmount}</span>
          TL
        </p>
      </div>

      <div className="dashboard__summary__infos">
        <NavLink to="/dashboard/products" style={{ textDecoration: "none" }}>
          <p>Ürünler
            <span>{allProducts && allProducts.length}</span>
          </p>
        </NavLink>
        <NavLink to="/dashboard/orders" style={{ textDecoration: "none" }}>
          <p>Siparişler
            <span>{allOrders && allOrders.length}</span>
          </p>
        </NavLink>
        <NavLink to="/dashboard/users" style={{ textDecoration: "none" }}>
          <p>Kullanıcılar
            <span>{allUsers && allUsers.length}</span>
          </p>
        </NavLink>
      </div>

      <div className="dashboard__summary__linechart">
        <Line data={lineState} />
      </div>

      <div className="dashboard__summary__doughnutchart">
        <Doughnut data={doughnutState} />
      </div>
    </div>
  )
}

export default DashboardMain;
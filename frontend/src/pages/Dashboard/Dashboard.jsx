import "./Dashboard.scss";
import DashboardPanel from "../../components/DashboardPageComponents/DashboardPanel/DashboardPanel";
import DashboardContent from "../../components/DashboardPageComponents/DashboardContent/DashBoardMain/DashboardMain";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardPanel />
    </div>
  )
}

export default Dashboard;
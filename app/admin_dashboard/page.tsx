import Card from "@/components/card/card";
import Chart from "@/components/chart/chart";
import styles from "./admin_dashboard.module.css";
import Rightbar from "@/components/rightbar/rightbar";
import Transactions from "@/components/transactions/transactions";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;

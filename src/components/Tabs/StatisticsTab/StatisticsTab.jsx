import StatisticsTable from "../../StatisticsTable/StatisticsTable";
import StatisticsDashboard from "../../StatisticsDashboard/StatisticsDashboard";
import StatisticsChart from "../../StatisticsChart/StatisticsChart";
import styles from "./StatisticsTab.module.css";
function StatisticsTab() {
  return (
    <div className={styles.statisticsPage}>
      <div className={styles.titleAndChart}>
        <h2 className={styles.title}>Statistics</h2>
        <StatisticsChart />
      </div>
      <div>
        <StatisticsDashboard />
        <StatisticsTable />
      </div>
    </div>
  );
}
export default StatisticsTab;

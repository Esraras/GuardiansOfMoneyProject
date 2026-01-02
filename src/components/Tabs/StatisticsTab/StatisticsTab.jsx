import StatisticsTable from "../../StatisticsTable/StatisticsTable";
import StatisticsDashboard from "../../StatisticsDashboard/StatisticsDashboard";
import StatisticsChart from "../../StatisticsChart/StatisticsChart";
import styles from "./StatisticsTab.module.css";
import { useEffect, useState } from "react";
import LoadingScreenSharedLayoutPages from "../../common/LoadingScreenSharedLayoutPages/LoadingScreenSharedLayoutPages";
function StatisticsTab() {
  const [forcedLoading, setForcedLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setForcedLoading(false), 1500);
  }, [forcedLoading]);

  if (forcedLoading) {
    return <LoadingScreenSharedLayoutPages />;
  }

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

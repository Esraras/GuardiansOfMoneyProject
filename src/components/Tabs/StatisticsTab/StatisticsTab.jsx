import { useEffect, useState } from "react";
import StatisticsTable from "../../StatisticsTable/StatisticsTable";
import StatisticsDashboard from "../../StatisticsDashboard/StatisticsDashboard";
import StatisticsChart from "../../StatisticsChart/StatisticsChart";
import css from "./StatisticsTab.module.css";
import LoadingScreenSharedLayoutPages from "../../common/LoadingScreenSharedLayoutPages/LoadingScreenSharedLayoutPages";
function StatisticsTab() {
  const [forcedLoading, setForcedLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setForcedLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (forcedLoading) {
    return <LoadingScreenSharedLayoutPages />;
  }
  return (
    <div className={css.statisticsPage}>
      <div className={css.titleAndChart}>
        <h2 className={css.title}>Statistics</h2>
        <StatisticsChart />
      </div>
      <div className={css.dashboardAndTable}>
        <StatisticsDashboard />
        <StatisticsTable />
      </div>
    </div>
  );
}
export default StatisticsTab;

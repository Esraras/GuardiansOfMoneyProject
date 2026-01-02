/*
import styles from "./StatisticsPage.module.css";
import { useEffect, useState } from "react";

import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import StatisticsChart from "../../components/StatisticsChart/StatisticsChart";
import LoadingScreenSharedLayoutPages from "../../components/common/LoadingScreenSharedLayoutPages/LoadingScreenSharedLayoutPages";

const StatisticsPage = () => {
    const [forcedLoading, setForcedLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setForcedLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (forcedLoading) {
        return <LoadingScreenSharedLayoutPages />;
    }

    return (
        <div className={styles.statisticsPage}>
            <div className={styles.titleAndChart}>
                <h1 className={styles.title}>Statistics</h1>
                <StatisticsChart />
            </div>

            <div className={styles.dashboardAndTable}>
                <StatisticsDashboard />
                <StatisticsTable />
            </div>
        </div>
    );
};

export default StatisticsPage;
*/

import "animate.css";

import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

import { useSelector } from "react-redux";
import styles from "./StatisticsChart.module.css";
import {
  selectFilteredCategories,
  selectIsLoading,
  selectTransactionsSummary,
} from "../../redux/Statistics/selectors";
import { getTrasactionCategoryColor } from "../../constants/TransactionConstants";
import LoadingSpinner from "../common/LoadingSpinner/Loader";

const StatisticsChart = () => {
  const isLoading = useSelector(selectIsLoading);

  const balanceForSpecificPeriod = useSelector(
    selectTransactionsSummary
  )?.periodTotal;

  function formatNumber(balanceAmount) {
    if (balanceAmount === undefined || balanceAmount === null) return "0.00";
    return balanceAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const filteredCategories = useSelector(selectFilteredCategories);

  const chartLabels =
    filteredCategories?.length > 0
      ? filteredCategories?.map((item) => item.name)
      : ["There is no data for selected date"];

  const chartValues =
    filteredCategories?.length > 0
      ? filteredCategories?.map((item) => item.total * -1)
      : [100];

  const chartBackgroundColors =
    filteredCategories?.length > 0
      ? filteredCategories?.map((item) => getTrasactionCategoryColor(item.name))
      : ["rgba(255, 255, 255, 0.6)"];

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: chartBackgroundColors,
        borderWidth: 0,
        hoverOffset: 5,
        // hoverBorderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      arc: {
        hoverOffset: 4,
      },
    },
  };

  const textAnimatioClasses =
    "animate__animated  animate__zoomIn animate__slow";

  return (
    <div className={styles.chartContainer}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div style={{ width: "100%", height: "100%" }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className={`${styles.balance} ${textAnimatioClasses}`}>
            ${"     "}
            {balanceForSpecificPeriod
              ? formatNumber(balanceForSpecificPeriod.toFixed(2))
              : "0.00"}
          </div>
        </>
      )}
    </div>
  );
};

export default StatisticsChart;

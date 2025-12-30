import { Routes, Route } from "react-router-dom";
import StatisticsPage from "../../pages/StatisticsPage/StatisticsPage";
import StatisticsChart from "../StatisticsChart/StatisticsChart";
import StatisticsTable from "../StatisticsTable/StatisticsTable";
import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StatisticsPage />} />
      <Route path="/chart" element={<StatisticsChart />} />
      <Route path="/table" element={<StatisticsTable />} />
      <Route path="/dashboard" element={<StatisticsDashboard />} />
    </Routes>
  );
};

export default App;

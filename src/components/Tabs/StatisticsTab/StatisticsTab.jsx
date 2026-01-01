import StatisticsTable from '../../StatisticsTable/StatisticsTable';
import StatisticsDashboard from '../../StatisticsDashboard/StatisticsDashboard';
import StatisticsChart from '../../StatisticsChart/StatisticsChart';
  
function StatisticsTab() {
  return (
    <div>
      <h2>Statistics</h2>
      <StatisticsChart />
      <StatisticsDashboard />
      <StatisticsTable />
    </div>
  );
}
export default StatisticsTab;

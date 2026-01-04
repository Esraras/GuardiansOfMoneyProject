import { useState } from "react";
import Header from "../../components/Header/Header";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import CurrencyAreaChart from "../../components/CurrencyAreaChart/CurrencyAreaChart";
import css from "./DashBoardPage.module.css";
import Navigation from "../../components/Navigation/Navigation";
import HomeTab from "../../components/Tabs/HomeTab/HomeTab";
import StaticsTab from "../../components/Tabs/StatisticsTab/StatisticsTab";
import Balance from "../../components/Balance/Balance";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import ModalEditTransaction from "../../components/ModalEditTransaction/ModalEditTransaction";
import CurrencyTab from "../../components/Tabs/CurrencyTab/CurrencyTab.jsx";
import CryptoChart from "../../components/CryptoChart/CryptoChart.jsx";



const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState("home");

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return <HomeTab />;
            case "statistics":
                return <StaticsTab />;
            case "currency":
                return (
                    <>
                        <CurrencyTab />
                        <CurrencyAreaChart />
                        <CryptoChart />
                    </>
                );
            default:
                return <HomeTab />;
        }
    };

return (
  <>
    <Header />
    <div className={css.dashboardContainer}>
      <div className={css.sideBar}>
        <div className={css.navBalance}>
          <Navigation
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          <div className={css.balance}>
            <Balance />
          </div>
        </div>
        <div className={css.currencyChart}>
          <CurrencyTab />
          <CurrencyAreaChart />
          <CryptoChart />
        </div>
      </div>
      <div className={css.divider}></div>
      <div className={css.mainContent}>
        {renderContent()}
        <ButtonAddTransactions />
      </div>
      <ModalAddTransaction />
      <ModalEditTransaction />
    </div>
  </>
);

};

export default DashboardPage;

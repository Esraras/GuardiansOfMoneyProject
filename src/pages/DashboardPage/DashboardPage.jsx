import Header from "../../components/Header/Header";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import CurrencyAreaChart from "../../components/CurrencyAreaChart/CurrencyAreaChart";
import css from "./DashBoardPage.module.css";
 
const DashboardPage = () => {
    return (
        <>
            <Header />
            <div className={css.dashboardContainer}>
                <div className={css.sideBar}>
                    {/* navigations */}
                    {/*balance*/}
                    <CurrencyAreaChart />
                </div>
                <div className={css.divider}></div>
                <div>
                    {/*import home tab */}
                    {/* import statics tab*/}
                    <ButtonAddTransactions />
                </div>
            </div>
        </>
    );
};
export default DashboardPage;
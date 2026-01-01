import Header from "../../components/Header/Header";
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";

const DashboardPage = () => {

    return (
        <>
        <Header />
        <ModalAddTransaction />
        <ModalEditTransaction />
        <ButtonAddTransactions />
        
        
        </>
        
    );
};
export default DashboardPage;
import Modal from "react-modal";
import styles from "./ModalEditTransaction.module.css";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import { useDispatch, useSelector } from "react-redux";
// import { getTransactionsCategories } from '../../redux/Statistics/operations';
import {
  closeEditModal,
  selectIsEditModalOpen,
} from "../../redux/Modals/slice";

Modal.setAppElement("#root");

function ModalEditTransaction() {
  const dispatch = useDispatch();
  const isOpenModal = useSelector(selectIsEditModalOpen);

  return (
    <Modal
      isOpen={isOpenModal}
      className={styles.modal}
      overlayClassName={styles.modal_Wrap}
      onRequestClose={() => dispatch(closeEditModal())}
    >
      <div
        className={styles.modal_close}
        onClick={() => dispatch(closeEditModal())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path d="M1 1L17 17" stroke="#FBFBFB" />
          <path d="M1 17L17 0.999999" stroke="#FBFBFB" />
        </svg>
      </div>
      <h2>Edit transaction</h2>
      <EditTransactionForm />
    </Modal>
  );
}

export default ModalEditTransaction;

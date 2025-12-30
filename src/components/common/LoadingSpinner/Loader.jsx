import { ThreeDots } from "react-loader-spinner";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      // color="#FF868D"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperClass={styles.loadingSpinner}
    />
  );
};

export default LoadingSpinner;

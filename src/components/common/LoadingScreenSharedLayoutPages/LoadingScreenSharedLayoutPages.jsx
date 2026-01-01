import styles from "./LoadingScreenSharedLayoutPages.module.css";
import loadingScreenImg from "../../../images/loading_screen/loadingScreenImg.png";
import "animate.css/animate.min.css";
const LoadingScreenSharedLayoutPages = () => {
  return (
    <>
      <div className={styles.loadingScreenSharedLayoutPages}>
        <img
          src={loadingScreenImg}
          alt="logo"
          className="animate__animated  animate__rotateOut animate__infinite animate__slow"
        />
      </div>
    </>
  );
};

export default LoadingScreenSharedLayoutPages;

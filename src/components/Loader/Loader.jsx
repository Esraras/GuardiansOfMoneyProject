import React from "react";
import { Vortex } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={[
          "#FFB627",
          "#9E40BA",
          "#7000FF",
          "#4A56E2",
          "#FFC727",
          "#734AEF",
        ]}
      />
    </div>
  );
};

export default Loader;
export const customStyles = {
  option: (provided) => ({
    ...provided,
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "18px",
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "transparent",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "#FF868D",
      fontWeight: "400",
    },
    textAlign: "left",
  }),

  control: (styles) => ({
    ...styles,
    color: "#FBFBFB",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    boxShadow: "none",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
    display: "flex",
    flexWrap: "nowrap",
    outline: "transparent",
    padding: "0 8px",
  }),

  singleValue: (provided, state) => ({
    ...provided,
    opacity: state.isDisabled ? 0.5 : 1,
    transition: "opacity 300ms",
    color: "#FBFBFB",
    padding: "0",
    "@media screen and (max-width: 767.98px)": {
      paddingLeft: "9px",
    },
  }),

  menu: (provided) => ({
    ...provided,
    background:
      "linear-gradient(0deg, rgba(83, 61, 186, 0.70) 0%, rgba(80, 48, 154, 0.70) 43.14%, rgba(106, 70, 165, 0.52) 73.27%, rgba(133, 93, 175, 0.13) 120.03%)",
    borderRadius: "8px",
    backdropFilter: "blur(50px)",
    overflow: "hidden",
  }),

  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    paddingTop: "0px",
  }),

  valueContainer: (val) => ({
    ...val,
    padding: "0",
  }),

  placeholder: (provider) => ({
    ...provider,
    color: "rgba(255, 255, 255, 0.60)",
  }),

  input: (provided) => ({
    ...provided,
    margin: "0",
    color: "#FBFBFB",
    minWidth: "100%",
    caretColor: "transparent",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  indicators: () => ({
    cursor: "pointer",
  }),
};

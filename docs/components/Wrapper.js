import styles from "./Wrapper.module.scss";

const Wrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;

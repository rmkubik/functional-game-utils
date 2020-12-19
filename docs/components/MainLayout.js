import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};

export default MainLayout;

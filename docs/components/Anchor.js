import styles from "./Anchor.module.scss";

const Anchor = ({ id }) => {
  return <div id={id} className={styles.anchor} />;
};

export default Anchor;

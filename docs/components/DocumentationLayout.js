import documentationLayoutStyles from "./DocumentationLayout.module.scss";

const Documentation = ({ children }) => {
  return (
    <div className={documentationLayoutStyles.documentation}>{children}</div>
  );
};

export default Documentation;

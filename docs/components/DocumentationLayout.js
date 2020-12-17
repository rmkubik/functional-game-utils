import wrapperStyles from "./Wrapper.module.scss";
import documentationLayoutStyles from "./DocumentationLayout.module.scss";

const Documentation = ({ children }) => {
  return (
    <div
      className={`${wrapperStyles.wrapper} ${documentationLayoutStyles.documentation}`}
    >
      {children}
    </div>
  );
};

export default Documentation;

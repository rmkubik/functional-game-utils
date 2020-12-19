import { MDXProvider } from "@mdx-js/react";

import Wrapper from "../components/Wrapper";
import "../styles/global.scss";

const components = {
  wrapper: Wrapper,
};

function App({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />{" "}
    </MDXProvider>
  );
}

export default App;

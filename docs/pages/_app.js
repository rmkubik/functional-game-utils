import { MDXProvider } from "@mdx-js/react";

import Wrapper from "../components/Wrapper";

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

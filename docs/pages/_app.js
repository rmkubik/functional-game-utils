import { MDXProvider } from "@mdx-js/react";

import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import MainLayout from "../components/MainLayout";
import "../styles/global.scss";

const components = {
  wrapper: Wrapper,
};

function App({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <MainLayout>
        <Header />
        <Component {...pageProps} />{" "}
      </MainLayout>
    </MDXProvider>
  );
}

export default App;

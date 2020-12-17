import Link from "next/link";
import Wrapper from "../components/Wrapper";

const Home = () => {
  return (
    <Wrapper>
      <h1>Functional Game Utils</h1>
      <p>
        I created this library while working on my tile pased puzzle game
        [Wildfire Swap](https://wildfire.fun). It contains a lot of functions
        that I built after learning [Ramda.js](https://ramdajs.com/). Building a
        grid based game, I found a lot of the default functions are great for
        working with arrays. However, there were no functions for matrix
        manipulation.
      </p>
      <p>
        This library started by adding those functional matrix manipulation and
        parsing functions. Additionally, this library now has other generally
        applicable game development utility functions for things like
        pathfinding and randomness.
      </p>
      <Link href="/docs">Documentation</Link>
    </Wrapper>
  );
};

export default Home;

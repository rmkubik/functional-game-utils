import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    // UMD requires a bundle name
    name: "functional-game-utils",
    file: "dist/index.js",
    // UMD format can be used in browser and node
    format: "umd",
    // UMD Format needs to know these are global variables
    globals: {
      ramda: "ramda",
      "ramda-adjunct": "ramda-adjunct"
    }
  },
  // Because we want ramda and ramda-adjunct to be peer dependencies, we need to tell rollup not to bundle them
  external: ["ramda", "ramda-adjunct"],
  plugins: [
    // This is required to bundle node_modules, like the corejs polyfills
    resolve(),
    // This is required to read modules written in commonjs, like the corejs polyfills
    commonjs(),
    // Transform out code from ESNext, use .babelrc for more config options
    babel({
      // Do not transform packages in node_modules, if a specific module isn't precompiled, you can compile it here
      exclude: ["node_modules/**"]
    })
  ]
};

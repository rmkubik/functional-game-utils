import base from "./rollup.config.base";
import minify from "rollup-plugin-babel-minify";

export default [
  {
    ...base
  },
  {
    ...base,
    output: {
      ...base.output,
      file: "dist/functional-game-utils.min.js",
      sourcemap: false
    },
    plugins: [
      ...base.plugins,
      // Minify the bundle for production, remove sourceMaps and comments
      minify({
        sourceMap: true,
        comments: true
      })
    ]
  }
];

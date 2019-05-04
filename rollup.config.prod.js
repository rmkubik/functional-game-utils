import base from "./rollup.config.base";
import minify from "rollup-plugin-babel-minify";

export default {
  ...base,
  output: {
    ...base.output,
    sourcemap: false
  },
  plugins: [
    ...base.plugins,
    // Minify the bundle for production, remove sourceMaps and comments
    minify({
      sourceMap: false,
      comments: false
    })
  ]
};

import base from "./rollup.config.base";

export default {
  ...base,
  output: {
    ...base.output,
    sourcemap: true
  }
};

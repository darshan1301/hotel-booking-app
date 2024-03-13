// rollup.config.js
import css from "rollup-plugin-css-only";

export default {
  input: "src/main.js",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [css({ output: "bundle.css" })],
};

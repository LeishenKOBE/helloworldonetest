import babel from '@rollup/plugin-babel';

export default {
  input: "src/index.js",
  output: {
    file: "index.js",
    format: "umd",
    name: 'router'
  },
  plugins: [babel({ babelHelpers: 'bundled' })],
};

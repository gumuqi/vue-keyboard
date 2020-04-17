import babel from 'rollup-plugin-babel';
export default {
  input: './src/index.js',
  output: {
    file: './lib/bundle.js',
    format: 'esm',
    name: 'registerKeyboard'
  },
  plugins: [
    babel({
        exclude: ['node_modules/**']
    })
  ]
};
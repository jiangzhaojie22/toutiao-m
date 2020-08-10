module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': 0,
    'space-before-blocks': 0,
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'quote-props': 0,
    'key-spacing': 0,
    'vue/no-unused-vars': 0,
    'no-unused-vars': 0,
    'comma-spacing': 0,
    'camelcase': 0
  }
}

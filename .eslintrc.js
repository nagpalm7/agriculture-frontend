module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': ['error', { variables: false }],
    'no-use-before-define': ['error', { classes: true }],
    'no-param-reassign': [2, { props: false }],
    'no-use-before-define': ['error', { functions: false }],
  },
};

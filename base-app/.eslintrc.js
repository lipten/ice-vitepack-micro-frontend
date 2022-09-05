const { getESLintConfig, deepmerge } = require('@iceworks/spec');

// https://www.npmjs.com/package/@iceworks/spec
module.exports = deepmerge(
  {
    rules: {
      'generator-star-spacing': 0,
    },
  },
  getESLintConfig('react-ts'),
);

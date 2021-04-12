var postcss = require('postcss');

const prefixer = postcss.plugin('postcss-class-specificity', function (ops) {
  const options = ops || {};

  if (!(options.pattern instanceof RegExp)) {
    throw Error('Pattern is required!');
  }

  if(!(options.callback instanceof Function)) {
    throw Error('Callback is required!');
  }

  return function (css, result) {
    css.walkRules(function (rule) {
      rule.selectors = rule.selectors.map(function (selector) {
        if (options.pattern.test(selector)) {
          return options.callback(selector);
        }
        return selector;
      });
    });
  }
});

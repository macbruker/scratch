const postcssNesting = require('postcss-nesting')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

module.exports = (env) => {
  return {
    plugins: [
      postcssNesting(),
      env.env === 'prod' && cssnano({
        preset: 'default',
      }),
      autoprefixer
    ]
  }
}

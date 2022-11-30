const markdownIt = require('markdown-it')
const htmlmin = require('html-minifier')
const compression = require('compression')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.min.js': './main.min.js',
  })
  eleventyConfig.addPassthroughCopy('./src/assets/images/*')
  eleventyConfig.addPassthroughCopy('./src/assets/fonts/*')
  eleventyConfig.addWatchTarget('./src/assets/main.css')
  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.addFilter('markdown', function (value) {
    return new markdownIt({
      html: true,
      typographer: true,
      quotes: '«»',
    }).render(value)
  })

  eleventyConfig.addFilter('markdownInline', function (value) {
    return new markdownIt({
      html: false,
    }).renderInline(value)
  })

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: {
          level: 2,
        },
      })
      return minified
    }

    return content
  })

  eleventyConfig.setServerOptions({
    enabled: true,
    showVersion: true,
    port: 8888,
    middleware: [
      // function compression(req, res, next) {
      //   res.writeHead(200, { "content-type": "text/html" });
      //   res.end();
      //   next();
      // },
    ],
  })

  return {
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', 'md'],
    dir: {
      input: 'src',
      data: '_data',
      includes: '_includes',
      output: 'dist',
    },
  }
}

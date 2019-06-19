module.exports = function(config) {

  // config.addCollection('posts', collection => {
  //   return collection.getFilteredByGlob('**/posts/*.md').reverse()
  // })

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
      data: 'data',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk'
  }
}

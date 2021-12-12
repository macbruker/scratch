const compress = require('compression');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./node_modules/alpinejs/dist/cdn.min.js": "./main.min.js" });
  eleventyConfig.addPassthroughCopy("./static/images/*");
  eleventyConfig.addPassthroughCopy("./static/fonts/*");
  eleventyConfig.addWatchTarget("./src/main.css");
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setBrowserSyncConfig({
    server: {
      baseDir: './dist',
      middleware: function(req,res,next){
        const gzip = compress();
        gzip(req,res,next);
      }
    }
  });

  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      output: "dist",
    }
  }
}

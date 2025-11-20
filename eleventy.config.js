import markdownIt from 'markdown-it'
import htmlMinifier from 'html-minifier-terser'
import compression from 'compression'
import { transform } from 'lightningcss'
import { EleventyHtmlBasePlugin } from '@11ty/eleventy'

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin)
  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.min.js': './main.min.js',
  })
  eleventyConfig.addPassthroughCopy('./src/assets/images/*')
  eleventyConfig.addPassthroughCopy('./src/assets/fonts/*')
  eleventyConfig.addWatchTarget('./src/assets/main.css')

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: false,
    }),
  )

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
    const env = process.env.ELEVENTY_ENV
    if (env === 'production' && outputPath && outputPath.endsWith('.html')) {
      let minified = htmlMinifier.minify(content, {
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

  // Build Time
  eleventyConfig.addGlobalData('generated', () => {
    let now = new Date()
    return new Intl.DateTimeFormat('no-NB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now)
  })

  // Bundles
  eleventyConfig.addBundle('css', {
    toFileDirectory: '',
    transforms: [
      async function (content) {
        // 'this.type' returns the bundle name.
        if (this.type === 'css') {
          let result = await transform({
            code: Buffer.from(content),
            minify: true,
            sourceMap: true,
            drafts: {
              nesting: true,
            },
          })
          return result.code
        }
        return content
      },
    ],
  })

  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.setServerOptions({
    enabled: true,
    showVersion: true,
    // port: 8888,
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

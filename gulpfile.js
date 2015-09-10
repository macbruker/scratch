/************************************************\
 ***************** MY GULP FILE *****************
\************************************************/



// Variables
var path  = '';
var url   = 'http://scratch.dev';
var files = {
    js:   path + 'js/main.js',
    sass: path + 'scss/**/*.scss',
    css:  path + 'css',
    svg:  path + 'img/svg'
};



// Plugins
var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    include      = require('gulp-include'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify');
    svgSprite    = require('gulp-svg-sprite');



// Error function for Plumber
var onError = function (err) {
    console.log(err);
    this.emit('end');
};



// Browsersync
gulp.task('browsersync', ['sass'], function() {
    browserSync.init();
    gulp.watch(files.sass, [ 'sass' ]);
    gulp.watch(files.js, [ 'scripts' ]);
    gulp.watch('*.html').on('change', browserSync.reload);
});



// Sass
gulp.task('sass', function() {
    return gulp.src(files.sass)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(minifycss())
        .pipe(gulp.dest(files.css))
        .pipe(browserSync.stream())
});




// Scripts
gulp.task('scripts', function() {
    gulp.src(files.js)
        .pipe(include())
        // .pipe(ngmin({dynamic: false}))
        // .pipe(uglify())
        .pipe(gulp.dest(path + '/js/min'));
});



// SVG Sprite Configuration
config = {
    shape: {
        dimension: {
            maxWidth: 32,
            maxHeight: 32
        },
        spacing: {
            padding: 10
        },
        dest: 'intermediate-svg'
    },
    mode: {
        view: {
            bust: false,
            render: {
                scss: true
            }
        },
        symbol: true
    }
};



// SVG Sprite Task
gulp.task('svg', function() {
    gulp.src('**/*.svg', { cwd: files.svg })
        .pipe(plumber())
        .pipe(svgSprite(config))
            .on('error', function(error){
                /* Do some awesome error handling ... */
            })
        .pipe(gulp.dest(files.svg));
});



// Commands
gulp.task('build', ['main']);
gulp.task('default', ['browsersync']);
gulp.task('sprite', ['svg']);

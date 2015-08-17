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

// Variables
var path         = '';
var url          = 'http://scratch.dev';
var files        = {
	js: path + 'js/main.js',
	sass: path + 'scss/**/*.scss',
	css:  path + 'css'
};


// Error function for Plumber
var onError = function (err) {
	console.log(err);
	this.emit('end');
};


// Serve
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		proxy: url
	});

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

// Browser Sync
gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: vhost
	});
});



gulp.task('scripts', function () {
	gulp.src(files.js)
		.pipe(include())
		// .pipe(ngmin({dynamic: false}))
		// .pipe(uglify())
		.pipe(gulp.dest(path + '/js/min'));
});


gulp.task('build', ['main']);
gulp.task('default', ['serve']);

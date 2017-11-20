'use strict'

const gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat');

gulp.task('html', () => {
	gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('sass', () => {
	gulp.src('./src/sass/main.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
gulp.task('js', () => {

	gulp.src('./src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.reload({
			stream: true
		}));

});

gulp.task('livereload', (serverConfig) => {
	browserSync({
		server: {
			baseDir: "./dist"
		},
		tunnel: true,
		port: 9000
	});
});

gulp.task('watch', () => {
	watch(['./src/**/*.html', './src/sass/**/*.sass', './src/sass/**/*.scss', './src/js/**/*.js'], function () {
		gulp.start(['html', 'sass', 'js']);
	});
});


gulp.task('dev', ['html', 'sass', 'js', 'livereload', 'watch']);
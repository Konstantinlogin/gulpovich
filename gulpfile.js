'use strict'

const gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	imagemin = require('gulp-imagemin'),
	del = require('del');

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

gulp.task('img', () => {
	gulp.src('./src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('fonts', () => {
	gulp.src('./src/fonts/*')
		.pipe(gulp.dest('./dist/fonts'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('delete-img', function (cb) {
 	return del('./dist/img', cb)
 });

 gulp.task('delete-fonts', function (cb) {
 	return del('./dist/fonts', cb);
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
	watch(
		[
			'./src/**/*.html',
			'./src/sass/**/*.sass',
			'./src/sass/**/*.scss',
			'./src/js/**/*.js',
			'./src/img/*',
			'./src/fonts/*'
		],
		function () {
			gulp.start([
				'html',
				'sass',
				'js',
				'img',
				'delete-img',
				'fonts',
				'delete-fonts'
			]);
		});
});

gulp.task('uglyCss', () => {
	gulp.src('./src/sass/main.sass')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('uglyJs', function () {
	gulp.src('./src/js/*.js')
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/js'))
});

gulp.task('dev', ['html', 'sass', 'js', 'img', 'delete-img', 'fonts', 'delete-fonts', 'livereload', 'watch']);
gulp.task('prod', ['html', 'uglyCss', 'uglyJs', 'img', 'delete-img', 'fonts', 'delete-fonts',]);
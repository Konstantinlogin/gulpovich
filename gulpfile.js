'use strict'

const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');

const serverConfig = {
	server: {
		baseDir: "./dist"
	},
	tunnel: true,
	port: 9000
};

gulp.task('html', () => {
	gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('livereload', () => {
	browserSync({
		server: {
			baseDir: "./dist"
		}
	});
});

gulp.task('watch', () => {
	watch(['./src/**/*.html'], function() {
		gulp.start('html');
	});
});


gulp.task('dev', ['html', 'livereload', 'watch']);
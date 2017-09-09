var gulp = require('gulp'),
		sass = require('gulp-sass');

gulp.task('sass', function(){
	return gulp.src('proj1/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('proj1/css/'))
});

gulp.task('watch', function(){
	gulp.watch('proj1/sass/**/*.sass', ['sass']);
});
gulp.task('default', ['watch']);
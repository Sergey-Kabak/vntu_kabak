var gulp = require('gulp'),
		sass = require('gulp-sass'),
		git = require('gulp-git'),
		browserSync  = require('browser-sync')
		//argv = require('yargs').argv,
		runSequence = require('run-sequence');

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - proj1
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('add', function() { // Инициализация измененных файлов
  console.log('adding...');
  return gulp.src('app/')
    .pipe(git.add());
});

gulp.task('gitsend', function() {
  runSequence('add');
});

gulp.task('sass', function(){ // преобразование sass в css
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/css/'))
});

gulp.task('watch', ['browser-sync'], function(){ // отслеживание изменений 
	gulp.watch('app/sass/**/*.sass', function(event, cb) {
		setTimeout(function(){gulp.start('sass', browserSync.reload);},500) // задача выполниться через 500 миллисекунд и файл успеет сохраниться на диске
	});
	gulp.watch('app/index.html', function() {
		runSequence('add');
	});
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/index.html', browserSync.reload);
});
gulp.task('default', ['watch']);

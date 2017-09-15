var gulp = require('gulp'),
		sass = require('gulp-sass'),
		git = require('gulp-git'),
		browserSync  = require('browser-sync')
		//argv = require('yargs').argv,
		runSequence = require('run-sequence');

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'proj1' // Директория для сервера - proj1
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('add', function() { // Инициализация измененных файлов
  console.log('adding...');
  return gulp.src('proj1/')
    .pipe(git.add());
});

gulp.task('gitsend', function() {
  runSequence('add');
});

gulp.task('sass', function(){ // преобразование sass в css
	return gulp.src('proj1/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('proj1/css/'))
});

gulp.task('watch', function(){ // отслеживание изменений 
	gulp.watch('proj1/sass/**/*.sass', function(event, cb) {
		setTimeout(function(){gulp.start('sass');},500) // задача выполниться через 500 миллисекунд и файл успеет сохраниться на диске
	});
	gulp.watch('proj1/index.html', function() {
		runSequence('add');
	});
});
gulp.task('default', ['watch', 'browser-sync']);

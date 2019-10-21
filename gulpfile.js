var gulp = require('gulp'),
 concat = require('gulp-concat'),
 sass = require('gulp-sass'),
 browserSync = require('browser-sync'),
 uglify = require('gulp-uglifyjs'),
 cssnano = require('gulp-cssnano'),
 rename = require('gulp-rename'),
 del = require('del'),
 pngquant = require('imagemin-pngquant'),
 cache = require('gulp-cache');
 autoprefixer = require('gulp-autoprefixer');
 notify        = require('gulp-notify');

 gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: 'app'
		},
		notify: false,
	})
});

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('script', function(){
	return gulp.src([
		//'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js', // Always at the end
		])
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('clear', function(){
	return cache.clearAll();
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch(['app/libs/**/*.js', 'app/js/common.js'], gulp.parallel('script'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});


gulp.task('css-libs', gulp.parallel('sass'), function(){
	return gulp.src('./app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('build', gulp.parallel('clean', 'img', 'sass', 'script'), function(){
	var buildCss = gulp.src([
		'src/css/main.css',
		'src/css/libs.min.css',
	]).pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('src/js/**/*')
	.pipe(gulp.dest('dist/js'));
 
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('sass', 'script', 'browser-sync', 'watch'));

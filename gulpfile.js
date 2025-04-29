'use strict';
const httpSite = 'https://gudman.test-site.su/',
    site = '/',
    template = 'build',
    assets = '/assets',
    app = 'app',
    gulp = require('gulp'),
    watch = require("gulp"),
    browserSync = require('browser-sync'),
    sass = require('gulp-dart-sass'),
    concat = require('gulp-concat'),
    gulpTerser = require('gulp-terser'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    gulp_imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    vinylFtp = require('vinyl-ftp'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('browser_sync', function() {
    browserSync.init({
        proxy: httpSite,
        port: 7777,
        notify: false,
        ghost: true,
    });
});

gulp.task('clean', function() {
    return del.sync(template);
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('gulp_sass', function() {
    return gulp.src('./' + app + assets + '/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./' + template + assets + '/css'))
        .pipe(conn.dest('/' + site + assets + '/css'))
        .pipe(browserSync.stream());
    }
);

gulp.task('script', function() {
    return gulp.src('./' + app + assets + '/js/index.js')
        .pipe(concat('script.min.js'))
        .pipe(gulpTerser())
        .pipe(gulp.dest('./' + template + assets + '/js'))
        .pipe(conn.dest('/' + site + assets + '/js'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('./' + app + '/**/*.html')
        .pipe(gulp.dest('./' + template + '/'))
        .pipe(conn.dest('/' + site + '/'))
        .pipe(browserSync.stream());
});

gulp.task('fonts_golos_text', function() {
    return gulp.src('./' + app + '/assets/fonts/golos-text/**/*', { encoding: false })
        .pipe(gulp.dest('./' + template + assets + '/fonts/golos-text'))
        .pipe(conn.dest('/' + site + assets + '/fonts/golos-text'))
        .pipe(browserSync.stream());
});

gulp.task('php', function() {
    return gulp.src('./' + app + '/**/**/*.php')
        .pipe(gulp.dest('./' + template + '/'))
        .pipe(conn.dest('/' + site + '/'))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src('./' + app + assets + '/*.css')
        .pipe(autoprefixer({
            browsers: ['last 10 version', 'safari 5', 'ie  6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }, { cascade: true }))
        .pipe(cssnano())
        .pipe(gulp.dest('./' + template + '/'))
        .pipe(conn.dest('/' + site + '/'))
        .pipe(browserSync.stream());
});

gulp.task('css_directories', function() {
    return gulp.src('./' + app + assets + '/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 10 version', 'safari 5', 'ie  6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }, { cascade: true }))
        .pipe(cssnano())
        .pipe(gulp.dest('./' + template + assets + '/css/'))
        .pipe(conn.dest('/' + site + assets + '/css/'))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    return gulp.src('./' + app + assets + '/images/**/*.+(jpg|jpeg|png|gif)', { encoding: false })
        .pipe(cache(gulp_imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
        })))
        .pipe(gulp.dest('./' + template + assets + '/images'))
        .pipe(conn.dest('/' + site + assets + '/images'))
        .pipe(browserSync.stream());
});

gulp.task('file', function() {
    return gulp.src('./' + app + '/file/**/*.+(jpg|jpeg|png|gif)', { encoding: false })
        .pipe(cache(gulp_imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
        })))
        .pipe(gulp.dest('./' + template + assets + '/file'))
        .pipe(conn.dest('/' + site + assets + '/file'))
        .pipe(browserSync.stream());
});

gulp.task('png', function() {
    return gulp.src('./' + app + '/*.png', { encoding: false })
        .pipe(cache(gulp_imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
        })))
        .pipe(gulp.dest('./' + template + '/'))
        .pipe(conn.dest('/' + site + '/'))
        .pipe(browserSync.stream());
});

gulp.task('svg', function() {
    return gulp.src('./' + app + assets + '/images/**/*.svg')
        .pipe(gulp.dest('./' + template + assets + '/images'))
        .pipe(conn.dest('/' + site + assets + '/images'))
        .pipe(browserSync.stream());
});

gulp.task('ico', function() {
    return gulp.src('./' + app + '/*.ico', { encoding: false })
        .pipe(gulp.dest('./' + template + '/'))
        .pipe(conn.dest('/' + site + '/'))
        .pipe(browserSync.stream());
});

gulp.task('tpl', function() {
    return gulp.src('./' + app + '/**/**/*.tpl')
        .pipe(gulp.dest('./' + template + '/'))
        .pipe(conn.dest('/' + site + '/'))
        .pipe(browserSync.stream());
});

gulp.task('htaccess', function() {
    return gulp.src('./' + app + '/**/**/.htaccess')
        .pipe(gulp.dest('./' + template + '/'))
        .pipe(conn.dest('/' + site + '/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', gulp.series(
    'fonts_golos_text', 
    'png', 
    'ico', 
    'svg', 
    'img', 
    'gulp_sass', 
    'script', 
    'php', 
    'css', 
    'html', 
    'tpl', 
    'htaccess', 
    'browser_sync'), function() {
        gulp.watch('./' + app + '/assets/scss/**/*.scss', gulp.series( 'gulp_sass' ));
        gulp.watch('./' + app + '/assets/js/**/*.js', gulp.series( 'jquery' ));
        gulp.watch('./' + app + '/assets/js/index.js', gulp.series( 'script' ));
        gulp.watch('./' + app + '/*.html', gulp.series( 'html' ));
    }
);

// Файлы для копирования по ftp
let globs = [
    template + '/**/*.*'
];

// Конфигурация
let FTP_Configuration = require( './ftp.json' );
// Соединение с ftp
let conn = vinylFtp.create({
    host: FTP_Configuration.host,
    port: 21,
    user: FTP_Configuration.user,
    password: FTP_Configuration.password,
    parallel: 5
});

gulp.task('deploy', function () {
    return gulp.src(globs, {base: '.', buffer: false})
        .pipe(conn.dest('/' + site + '/'));
});

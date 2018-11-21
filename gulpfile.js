var gulp         = require('gulp'),
    scss         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    plumber      = require('gulp-plumber'),
    pug          = require('gulp-pug'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel');


var paths = {
    src: {
        scss        : 'app/sass/**/*.scss',
        js          : 'app/js/**/*.js',
        html        : 'app/pug/*.pug',
        img         : 'app/img/**/*',
        static      : 'app/static/**/*',
        fonts       : 'app/fonts/**/*',
        vendorCss   : 'app/vendor/css/**/*.css',
        vendorJs    : [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery-validation/dist/jquery.validate.min.js',
            'bower_components/jquery-validation/dist/additional-methods.min.js',
            'bower_components/waypoints/lib/jquery.waypoints.min.js',
            'app/vendor/js/slick.min.js',
            'app/vendor/js/jquery-ui-price.min.js',
            'app/vendor/js/circle-progress.min.js',
            'app/vendor/js/jquery-ui.min.js'

        ],
    },
    dest: {
        scss        : 'build/css',
        js          : 'build/js',
        html        : 'build',
        img         : 'build/img',
        static      : 'build/static',
        fonts       : 'build/fonts',
        vendorCss   : 'build/css',
        vendorJs    : 'build/js',
    }
};

gulp.task('scss', function () {
    return gulp.src(paths.src.scss)
        .pipe(scss())
        .pipe(cssnano())
        .pipe(concat('app.min.css'))
        .pipe(autoprefixer([
            'last 15 versions',
            '>1%',
            'ie 8',
            'ie 7',
            'android 4',
            'opera 12',
            'ie 9',
            'safari 5',
            'ios 6'
        ], {cascade: true}))
        .pipe(gulp.dest(paths.dest.scss))
        .pipe(plumber())
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('babel', function () {
    return gulp.src(paths.src.js)
        .pipe(babel())
        .pipe(uglify(
            'app.min.js', {
                outSourceMap: true
            }))
        .pipe(gulp.dest(paths.dest.js));
});


gulp.task('vendor-js', function () {
    return gulp.src(paths.src.vendorJs)
        .pipe(concat('vendor.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(paths.dest.vendorJs));
});

gulp.task('vendor-css', function () {
    return gulp.src(paths.src.vendorCss)
        .pipe(cssnano())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest(paths.dest.vendorCss));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('clean', function () {
    return del.sync('build');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('img', function () {
    return gulp.src(paths.src.img)
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPluging: [{removeViewBox: false}],
            use: [pngquant()],
        })))
        .pipe(plumber())
        .pipe(gulp.dest(paths.dest.img));
});

gulp.task('static', function () {
    return gulp.src(paths.src.static)
        .pipe(gulp.dest(paths.dest.static));
});

gulp.task('fonts', function () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dest.fonts));
});

gulp.task('deploy', function () {
    return gulp.src('build/**/*')
        .pipe(gulp.dest('../public'));
});
gulp.task('html', function () {
    return gulp.src(paths.src.html)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(paths.dest.html))
        .pipe(plumber())
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browser-sync', 'vendor-css', 'vendor-js', 'fonts', 'scss', 'html', 'babel', 'static'], function () {
    gulp.watch(paths.src.scss, ['scss']);
    gulp.watch('app/pug/**/*.pug', ['html']);
    gulp.watch(paths.src.js, ['babel']);
});

gulp.task('build', ['clean', 'img', 'vendor-css', 'vendor-js', 'fonts', 'scss', 'babel', 'html', 'static']);

gulp.task('default', ['browser-sync', 'watch']);
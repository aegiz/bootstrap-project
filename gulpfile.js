var gulp = require('gulp');

var $$ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
  replaceString: /\bgulp[\-.]/,
  rename: {
    'gulp-minify-css': 'minifyCSS'
  }
});

var fs = require('fs');
var srcDir  = './src';
var destDir = './dist';

var config = {
  html: {
    src: srcDir + '/',
    dest: destDir + '/'
  },
  sass: {
    src: srcDir + '/sass',
    dest: destDir + '/assets/css'
  },
  js: {
    src: srcDir + '/scripts',
    dest: destDir + '/assets/scripts'
  },
  image: {
    src: srcDir + '/images',
    dest: destDir + '/assets/images'
  },
  font: {
    src: srcDir + '/fonts',
    dest: destDir + '/assets/fonts'
  },
  video: {
    src: srcDir + '/video',
    dest: destDir + '/assets/video'
  },
  lang: {
    src: srcDir + '/lang',
    dest: destDir + '/assets/lang'
  }
};

// Handle CLI erros
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('connect', function() {
  $$.connect.server({
    root: destDir,
    port: 8000,
    livereload: true
  });
});

gulp.task('html', function () {
  return gulp.src(config.html.src + '**/*.html')
  .pipe(gulp.dest(config.html.dest))
  .pipe($$.connect.reload());
});

gulp.task('image', function () {
  return gulp.src(config.image.src + '/**/*')
  .pipe($$.imagemin())
  .pipe(gulp.dest(config.image.dest))
  .pipe($$.connect.reload());
});

gulp.task('svg', function () {
  return gulp.src(config.image.src + '**/*.svg')
  .pipe($$.imagemin())
  .pipe(gulp.dest(config.image.dest))
  .pipe($$.connect.reload());
});

gulp.task('font', function () {
  return gulp.src(config.font.src + '/**/*')
  .pipe(gulp.dest(config.font.dest))
  .pipe($$.connect.reload());
});

gulp.task('video', function () {
  return gulp.src(config.video.src + '/*')
  .pipe(gulp.dest(config.video.dest))
  .pipe($$.connect.reload());
});

gulp.task('sass', function() {
  return gulp.src(config.sass.src + '/**/*.scss')
  .pipe($$.sass())
  .on('error', $$.notify.onError("Error: <%= error.message %>"))
  .on('error', handleError)
  .pipe($$.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')) // deux dernières version du browsers
  .pipe($$.minifyCSS())
  .pipe(gulp.dest(config.sass.dest))
  .pipe($$.connect.reload());
});


gulp.task('javascript', function () {
   return gulp.src($$.mainBowerFiles().concat(config.js.src + '/*.js'))
    .pipe($$.concat('all.js'))
    .pipe(gulp.dest(config.js.dest))
    .pipe($$.connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(config.sass.src + '/**/*.scss', ['sass']);
  gulp.watch(config.js.src + '/**/*.js', ['javascript']);
  gulp.watch(config.html.src + '/**/*.html', ['html']);
  gulp.watch(config.image.src + '/**/*', ['image', 'svg']);
});


gulp.task('default', ['connect', 'watch']);
gulp.task('compress-image', ['image']);
gulp.task('build', ['html', 'sass', 'javascript', 'image', 'font', 'video']);

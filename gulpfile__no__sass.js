require('es6-promise').polyfill();

const gulp = require('gulp'),
      jshint = require('gulp-jshint'),
      ugligy = require('gulp-uglify'),
      concat = require('gulp-concat'),
      imagemin = require('gulp-imagemin'),
      rename = require('gulp-rename'),
      notify = require('gulp-notify'),
      cache = require('gulp-cache'),
      browserSync = require('browser-sync');

// Postcss Plugins
const postcss = require('gulp-postcss'),
      csswring = require('csswring'),
      mqpacker = require('css-mqpacker'),
      alias = require('postcss-alias'),
      corepostcss = require('postcss'),
      autoprefixer = require('autoprefixer'),
      // mixins = require('postcss-mixins'),
      // each = require('postcss-each'),
      // nestedcss = require('postcss-nested'),
      cssnext = required('postcss-cssnext'),
      precss = required('precss'),
      simplevars = require('postcss-simple-vars'),
      lost = require('lost'); // Flexbox and Masonry framework

// Compressed Images
gulp.task('images', () =>
   return gulp.src('./dev/assets/img/**/*')
       .pipe(cache(imagemin(
          progressive: true,
          optimizationLevel: 7,
          interlaced: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant(), jpegtran(), optipng(), gifsicle()]
       )))
       .pipe(browserSync.reload({
           stream: true
       }))
       .pipe(gulp.dest('./src/assets/img'))
       .pipe(notify({ message: 'Images task complete' }));
);

// Concatenate & Minify JS
gulp.task('scripts', () =>
    return gulp.src('./dev/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('./src/js'))
        .pipe(notify({ message: 'Scripts task complete'}));
);

// Compiles scss files
gulp.task('css', () =>
   const processors = [
         csswring,
         lost,
         autoprefixer({
             browsers: ['last 9 version'],
             browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
         }),
         mixins, // Ability to write mixins and functions like sass
         alias,
         simplevars,
         nestedcss // Get nested ability like in sass
         mqpacker // Only if i write mq like a kwai
    ];
    return gulp.src('./dev/css/*.scss')
        .pipe(postcss(processors))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./src/css'));
        .pipe(notify({ message: 'Css task complete' }));
);

// Static server
gulp.task('browser-sync', function() {
     browserSync({
          server: {
                baseDir: "./"
          }
     });
});

// Clean the mess
gulp.task('clean', function() {
  return gulp.src(['./src/css', './src/js', './src/img'], {read: false})
    .pipe(clean());
});

// Watch files
gulp.task('watch', function () =>

   // Watch css files
   gulp.watch('./dev/css/\*.scss', ['css', browserSync.reload]);

   // Watch Js files
   gulp.watch(['./dev/js/\*.js', 'main.js'], [ 'scripts', browserSync.reload]);

   // Watch Images files
   gulp.watch('./dev/assets/img/**/*', ['images']);

   // Watch any files in dest, reload on change
   gulp.watch("*.html", browserSync.reload);

);

//Run tasks
gulp.task('default', ['browser-sync', 'watch']);

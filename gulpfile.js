const gulp = require("gulp");
const concat = require("gulp-concat");
const gulp_autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglify = require("gulp-uglify-es").default;
 
sass.compiler = require('node-sass');

const cssFiles = [
  "./src/css/main.css",
  "./src/css/media.css",
];

function compile_sass() {
  return gulp.src('./src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./src/css'));
}

function scripts() {
  return gulp.src(["./src/js/main.js"])
  .pipe(uglify())
  .pipe(gulp.dest("build/js"))
  .pipe(browserSync.stream())
}

function styles() {
  return gulp.src(cssFiles)
  .pipe(concat("style.css"))
  .pipe(gulp_autoprefixer({
    overrideBrowserslist: ["last 2 versions"],
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2,
  }))
  .pipe(gulp.dest("build/css"))
  .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
  gulp.watch("./src/js/**/*.js", scripts);
  gulp.watch("./src/css/**/*.css", styles);
  gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', compile_sass);
});
gulp.task("scripts", scripts);
gulp.task("styles", styles);
gulp.task("watch", gulp.parallel(watch, "sass:watch"));
gulp.task("build", gulp.series(compile_sass, styles, scripts));
gulp.task("dev", gulp.series("build", "watch"));
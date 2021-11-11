const gulp = require('gulp');
const del = require('delete');
const sass = require('sass');
const gulpSass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concatCss = require('gulp-concat-css');
const uglifyCss = require('gulp-uglifycss');
const gulpTs = require('gulp-typescript');
const concatJs = require('gulp-concat');
const uglifyJs = require('gulp-uglify');
const babel = require('gulp-babel');

const compilerSass = gulpSass(sass);
const tsProject = gulpTs.createProject('tsconfig.json');

/**
 * Clean dist directory (delete all files)
 * @param {Function} callback - Callback function
 * @return {void}
 */
function clean(callback) {
  del(
      [
        'dist/javascript/*',
        'dist/stylesheet/*',
      ],
      callback,
  );
};

/**
 * Compile Scss to css files
 * @return {void}
 */
function compileStylesheet() {
  return gulp
      .src('./src/scss/*.scss')
      .pipe(compilerSass().on('error', compilerSass.logError))
      .pipe(concatCss('bundle.css'))
      .pipe(uglifyCss())
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/stylesheet/'));
};

/**
 * Compile TypeScript to JavaScript files
 * @return {void}
 */
function compileJavaScript() {
  return gulp
      .src('./src/typescript/*.ts')
      .pipe(tsProject())
      .pipe(babel({
        presets: [
          '@babel/env',
          '@babel/preset-typescript'
        ],
      }))
      .pipe(concatJs('bundle.js'))
      .pipe(uglifyJs())
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/javascript/'));
};

/**
 * Watch for changes in files
 * @return {void}
 */
function watch() {
  gulp.watch('./src/scss/*.scss', compileStylesheet);
  gulp.watch('./src/typescript/*.ts', compileJavaScript);
}

module.exports.clean = clean;
module.exports.compileStylesheet = compileStylesheet;
module.exports.compileJavaScript = compileJavaScript;
module.exports.default = gulp.series(
    clean,
    gulp.parallel(
        compileStylesheet,
        compileJavaScript,
    ),
);
module.exports.watch = watch;

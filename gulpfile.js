const gulp = require('gulp');
const del = require('delete');
const sass = require('sass');
const gulpSass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concatCss = require('gulp-concat-css');
const uglifyCss = require('gulp-uglifycss');

const compilerSass = gulpSass(sass);

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
		.pipe(sourcemaps.init())
		.pipe(uglifyCss())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/stylesheet/'))
};

/**
 * Compile TypeScript to JavaScript files
 * @param {Function} callback - Callback function
 * @return {void}
 */
function compileJavaScript(callback) {
  callback();
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

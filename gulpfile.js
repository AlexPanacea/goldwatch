var gulp = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require("gulp-nodemon");
var tslint = require("gulp-tslint");
var del = require("del");

gulp.task('clean-dist', () => {
  return del('./dist');
});

gulp.task('copy-config', () => {
  return gulp.src('./src/config.json')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-html', () => {
  return gulp.src('./src/web/html/*')
    .pipe(gulp.dest('./dist/web/html'));
});

// Tslint config is not included in this file, editors like Visual Studio Code automatically look for this file
// and applies the rules to code, you then get feedback while writing code.
gulp.task('lint', () => {
  return gulp.src('./src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report());
});

gulp.task('compile', () => {
  return gulp.src(['src/**/*.ts', '!src/tests/**/*.spec.ts'])
    .pipe(ts(require('./tsconfig.json').compilerOptions))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build', gulp.series(['clean-dist', 'copy-config', 'copy-html', 'lint', 'compile']));

gulp.task('watch', (done) => {
  gulp.watch(['src/**/*.ts', '!src/tests/**/*.spec.ts'], gulp.series(['build']));
  nodemon({
    delay: 100,
    script: "dist/main.js",
    ignore: ['gulpfile.js'],
    ext: 'js'
  });
  done();
});

gulp.task('default', gulp.series(['build', 'watch']));
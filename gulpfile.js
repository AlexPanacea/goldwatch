import gulp from "gulp";
import ts from "gulp-typescript";
import nodemon from "gulp-nodemon";
// var tslint = require("gulp-tslint");
import tslintPlugin from "gulp-tslint";
import { deleteAsync } from "del";

gulp.task('clean-dist', () => {
  return deleteAsync('./dist');
});

gulp.task('copy-config', () => {
  return gulp.src('./src/config.json')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-package.json', () => {
    return gulp.src('./package.json')
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
    .pipe(tslintPlugin())
    .pipe(tslintPlugin.report());
});

gulp.task('compile', () => {
  var tsProject = ts.createProject('tsconfig.json');
  var tsResult = gulp.src(['src/**/*.ts', '!src/tests/**/*.spec.ts'])
  .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('./dist'));
});

gulp.task('build', gulp.series(['clean-dist', 'copy-config', 'copy-package.json', 'copy-html', 'lint', 'compile']));

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
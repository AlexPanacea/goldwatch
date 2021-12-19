var gulp = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require("gulp-nodemon");
var del = require("del");

gulp.task('clean-dist', () => {
  return del('./dist');
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

// gulp.task('lint', () => {
//   return gulp.src('./src/**/*.ts')
//         // eslint() attaches the lint output to the "eslint" property
//         // of the file object so it can be used by other modules.
//         .pipe(eslint())
//         // eslint.format() outputs the lint results to the console.
//         // Alternatively use eslint.formatEach() (see Docs).
//         .pipe(eslint.format())
//         // To have the process exit with an error code (1) on
//         // lint error, return the stream and pipe to failAfterError last.
//         .pipe(eslint.failAfterError());
// });

gulp.task('compile', () => {
  return gulp.src(['src/**/*.ts', '!src/tests/**/*.spec.ts'])
    .pipe(ts(require('./tsconfig.json').compilerOptions))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build', gulp.series(['clean-dist', 'copy-config', 'copy-package.json', 'copy-html', 'compile']));

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
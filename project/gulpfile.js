const { src, dest, task, series, watch, parallel } = require('gulp'),
rm = require('gulp-rm'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
sassGlob = require('gulp-sass-glob'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS = require('gulp-clean-css'),
sourcemaps = require('gulp-sourcemaps'),
babel = require('gulp-babel'),
uglify = require('gulp-uglify'),
svgo = require('gulp-svgo'),
svgSprite = require('gulp-svg-sprite'),
gulpif = require('gulp-if'),
env = process.env.NODE_ENV;
sass.compiler = require('node-sass');
const {DIST_PATH, SRC_PATH, STYLES_LIBS, SCRIPT_LIBS} = require('./gulp.config');

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

//PAGE ADD

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`).pipe(dest(DIST_PATH)).pipe(reload({stream: true}));
});

//FONTS ADD

task('copy:fonts', () => {
  return src(`${SRC_PATH}/fonts/*`).pipe(dest(`${DIST_PATH}/fonts`));
})

// IMAGES ADD

task('copy:images', () => {
  return src([`!${SRC_PATH}/img/icons/**/*`, `${SRC_PATH}/img/**/*`, `!${SRC_PATH}/img/*.svg`])
    // .pipe(rm(`!${SRC_PATH}/img/icons`))
    .pipe(dest(`${DIST_PATH}/img/`));
})

task('copy:svg', ()=> {
  return src(`${SRC_PATH}/img/*.svg`).pipe(dest(`${DIST_PATH}/img`));
});

task('styles', () => {
  return src([...STYLES_LIBS, `${SRC_PATH}/styles/*.scss`, `${SRC_PATH}/styles/**/*.scss`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'dev', autoprefixer({
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});

task('scripts', () => {
  return src([...SCRIPT_LIBS, `${SRC_PATH}/scripts/*.js`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpif(env === 'dev', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('icons', () => {
  return src(`${SRC_PATH}/img/icons/*.svg`)
    .pipe(svgo({
      plugins: [
        {removeAttrs: {attrs:['fill', 'stroke', 'style']}}
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest(`${DIST_PATH}/img`))
})

task('server', function () {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`
    },
    open: false
  });
});

task('watch', () => {
  watch(`./${SRC_PATH}/styles/**/*.scss`, series('styles'));
  watch(`./${SRC_PATH}/*.html`, series('copy:html'));
  watch(`./${SRC_PATH}/scripts/*.js`, series('scripts'));
  watch(`./${SRC_PATH}/img/icons/*.svg`, series('icons'));
})

task(
  'default',
  series('clean',
  parallel('copy:html', 'copy:fonts', 'copy:svg', 'copy:images', 'styles', 'scripts', 'icons'), 
  parallel('watch', 'server')
  )
);

task(
  'build',
  series('clean',
  parallel('copy:html', 'copy:fonts', 'copy:svg','copy:images' , 'styles', 'scripts', 'icons')
  )
);
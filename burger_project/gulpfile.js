const { src, dest, task, series, watch } = require('gulp'),
rm = require('gulp-rm'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
sassGlob = require('gulp-sass-glob'),
autoprefixer = require('gulp-autoprefixer'),
// px2rem = require('gulp-smile-px2rem'),
// gcmq = require('gulp-group-css-media-queries'),
cleanCSS = require('gulp-clean-css'),
sourcemaps = require('gulp-sourcemaps'),
babel = require('gulp-babel'),
uglify = require('gulp-uglify'),
svgo = require('gulp-svgo'),
svgSprite = require('gulp-svg-sprite');


sass.compiler = require('node-sass');

task('clean', () => {
  return src('dist/**/*', { read: false }).pipe(rm());
});

//PAGE ADD

task('copy:html', () => {
  return src('src/*.html').pipe(dest('dist')).pipe(reload({stream: true}));
});

//FONTS ADD

task('copy:fonts', () => {
  return src('src/fonts/*').pipe(dest('dist/fonts'));
})

// IMAGES ADD

task('copy:svg', ()=> {
  return src('src/img/*.svg').pipe(dest('dist/img'));
});

task('copy:bg', () => {
  return src('src/img/bg/*.png').pipe(dest('dist/img/bg'));
});

task('copy:slider-img', () => {
  return src('src/img/burger-slider/*.png').pipe(dest('dist/img/burger-slider'));
});

task('copy:content', () => {
  return src('src/img/content/*.png').pipe(dest('dist/img/content'));
});

task('copy:people', () => {
  return src('src/img/people/*.png').pipe(dest('dist/img/people'));
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  // 'node_modules/fullpage.js/dist/fullpage.css',
  'src/styles/main.scss'
]

task('styles', () => {
  return src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem())
    .pipe(autoprefixer({
      // overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    // .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

const libs = [
  'src/scripts/*.js',
  // 'node_modules/fullpage.js/dist/fullpage.js'
];

task('scripts', () => {
  return src(libs)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
});

task('icons', () => {
  return src('src/img/icons/*.svg')
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
    .pipe(dest('dist/img'))
})

task('server', function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});







watch('./src/styles/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/scripts/*.js', series('scripts'));
task('default', series('clean', 'copy:html', 'copy:fonts', 'copy:svg', 'copy:bg', 'copy:slider-img', 'copy:content', 'copy:people', 'styles', 'scripts', 'icons', 'server'));
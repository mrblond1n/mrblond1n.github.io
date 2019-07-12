const { src, dest, task, series, watch, parallel } = require('gulp'),
  rm = require('gulp-rm'),
  sass = require('gulp-sass'), // компиляция cscc в css
  concat = require('gulp-concat'), // конкатенация
  browserSync = require('browser-sync').create(), //синхронизация страницы
  reload = browserSync.reload, //автоматическое обновление страницы от изменений в проекте
  sassGlob = require('gulp-sass-glob'), // импорт всех scss файлов в один main.scss
  autoprefixer = require('gulp-autoprefixer'), // автопрефиксер
  cleanCSS = require('gulp-clean-css'), // минификация css кода
  sourcemaps = require('gulp-sourcemaps'), // добавление путей
  babel = require('gulp-babel'), // компилятор js кода для устаревших браузеров
  uglify = require('gulp-uglify'), // минификация js кода
  svgo = require('gulp-svgo'), // оптимизация svg картинок (Например, удаление ненужных аттрибутов)
  svgSprite = require('gulp-svg-sprite'), // создание Sprite для svg
  gulpif = require('gulp-if'), // добавление условий в gulp для разделения проекта
  env = process.env.NODE_ENV; // добавление переменных в package.json в "scripts" для разделения проекта
sass.compiler = require('node-sass');
const { DIST_PATH, // добавление путей и библиотек в gulp
  SRC_PATH,
  STYLES_LIBS,
  SCRIPT_LIBS } = require('./gulp.config');

task('clean', () => { // задача на удаление папки Dist
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

//CV ADD

task('copy:files', () => {
  return src(`${SRC_PATH}/cv-folder/*`)
    .pipe(dest(`${DIST_PATH}/cv-folder`));
})

//PAGE ADD

task('copy:html', () => { // копирование основного html
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

//FONTS ADD

task('copy:fonts', () => { // копирование шрифтов из ресурсов проекта
  return src(`${SRC_PATH}/fonts/*`)
    .pipe(dest(`${DIST_PATH}/fonts`));
})

// IMAGES ADD

task('copy:images', () => { // копирование картинок из ресурсов проекта
  return src(['!./src/img/icons/', `${SRC_PATH}/img/**/*`])
    .pipe(dest(`${DIST_PATH}/img/`));
})

task('styles', () => { // работа с cscc и css
  return src([...STYLES_LIBS,
  `${SRC_PATH}/styles/*.scss`,
  `${SRC_PATH}/styles/**/*.scss`])
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
    .pipe(reload({ stream: true }));
});

task('scripts', () => { // работа со скриптами
  return src([...SCRIPT_LIBS, `${SRC_PATH}/scripts/*.js`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('icons', () => { // автоматическое создание Sprite из всех папок >> всех svg иконок
  return src(`${SRC_PATH}/img/**/*.svg`)
    .pipe(svgo({
      plugins: [
        { removeAttrs: { attrs: ['fill', 'stroke', 'style'] } }
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

task('server', () => {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`
    },
    open: false
  });
});

task('watch', () => { //добавление вотчеров
  watch(`./${SRC_PATH}/styles/**/*.scss`, series('styles'));
  watch(`./${SRC_PATH}/*.html`, series('copy:html'));
  watch(`./${SRC_PATH}/scripts/*.js`, series('scripts'));
  watch(`./${SRC_PATH}/img/icons/*.svg`, series('icons'));
})

task( // Таск для разработки
  'default',
  series('clean',
    parallel('copy:html', 'copy:fonts', 'copy:files',
      'copy:images', 'styles', 'scripts', 'icons'),
    parallel('watch', 'server')
  )
);

task( // Таск для проекта
  'build',
  series('clean',
    parallel('copy:html', 'copy:fonts', 'copy:files',
      'copy:images', 'styles', 'scripts', 'icons'),
  )
);
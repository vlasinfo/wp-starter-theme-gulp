import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
const sass = gulpSass(sassCompiler);
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import gulpIf from 'gulp-if';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack-stream';
import { deleteAsync } from 'del';
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';

const server = browserSync.create();
const isProd = process.env.NODE_ENV === 'production';
const mode = process.env.MODE || 'wp';

const paths = {
  styles: { src: 'src/scss/**/*.scss', main: 'src/scss/main.scss', dest: 'assets/css/' },
  scripts: { src: 'src/js/**/*.js', entry: 'src/js/main.js', dest: 'assets/js/' },
  images: { src: 'src/img/**/*.{jpg,jpeg,png,svg,gif,webp,ico}', dest: 'assets/img/' },
  fonts: { src: 'src/fonts/**/*', dest: 'assets/fonts/' },
  html: { src: 'src/html/*.html', watch: 'src/html/**/*.html', dest: 'dist/' },
  vendor: { css: [], js: ['node_modules/swiper/swiper-bundle.js','node_modules/gsap/dist/gsap.js','node_modules/gsap/dist/ScrollTrigger.min.js'] }
};

export function clean() {
  return deleteAsync([
    'assets/css/*',
    'assets/js/*',
    'assets/img/*',
    'assets/fonts/*',
    ...(mode === 'html' ? ['dist/*'] : [])
  ]);
}

export function serve(done) {
  if (mode === 'wp') {
    server.init({
      proxy: 'http://parfumdeluxe.local',
      open: false,
      notify: false,
      port: 3000,
      injectChanges: true,
      files: ['**/*.php','assets/css/*.css','assets/js/*.js','assets/img/**/*']
    });
  } else {
    server.init({ server: './dist', open: true, notify: false, port: 3000 });
  }
  done();
}

export function html() {
  if (mode !== 'html') return Promise.resolve();
  return gulp.src(paths.html.src)
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(gulpIf(isProd, htmlmin({ collapseWhitespace: true, removeComments: true })))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(server.stream());
}

export function styles() {
  return gulp.src(paths.styles.main)
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(sass({ includePaths: ['node_modules'], outputStyle: isProd ? 'compressed' : 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpIf(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpIf(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream());
}

export function scripts() {
  return gulp.src(paths.scripts.entry)
    .pipe(webpack({
      mode: isProd ? 'production' : 'development',
      output: { filename: 'main.js' },
      module: {
        rules: [{ test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'], cacheDirectory: true } } }]
      },
      resolve: { extensions: ['.js'] },
      devtool: isProd ? false : 'source-map'
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(server.stream());
}

export function images() {
  return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest)).pipe(server.stream());
}

export function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest)).pipe(server.stream());
}

function watchFiles() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.fonts.src, fonts);
  gulp.watch(paths.vendor.css, styles);
  gulp.watch(paths.vendor.js, scripts);
  if (mode === 'html') gulp.watch(paths.html.watch, html);
  else gulp.watch(['**/*.php', '!node_modules/**']).on('change', server.reload);
}

export const build = gulp.series(clean, gulp.parallel(styles, scripts, images, fonts, html));
export const dev = gulp.series(build, gulp.parallel(serve, watchFiles));
export default dev;

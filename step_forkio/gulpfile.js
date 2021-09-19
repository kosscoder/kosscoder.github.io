import gulp from "gulp";
import concat from "gulp-concat";
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean';
import imagemin from 'gulp-imagemin';
import gulpSass from "gulp-sass";
 import nodeSass from "sass";
 const sass = gulpSass(nodeSass);

import BS from 'browser-sync';
const browserSync = BS.create();

const buildCssFunc = () => gulp.src("src/css/*.scss")
    .pipe(concat("styles.min.css"))
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: true
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("dist/css"));
const buildJsFunc = () => gulp.src("src/js/*.js").pipe(concat("scripts.min.js")).pipe(terser()).pipe(gulp.dest("dist/js"));
const minifyHtmlFunc = () => gulp.src("./index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));

const cleanDist = () => gulp.src("dist/*", {read: false}).pipe(clean());
const minifyImages = () => gulp.src("src/img/*").pipe(imagemin()).pipe(gulp.dest('dist/img'));



gulp.task("buildCss", buildCssFunc);
gulp.task("buildJs", buildJsFunc);
gulp.task("minifyImages", minifyImages);
gulp.task('minifyHtml', minifyHtmlFunc);
gulp.task("cleanDist", cleanDist);


const startWatching = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('src/**/*').on('change', gulp.series(buildCssFunc,buildJsFunc,minifyImages,minifyHtmlFunc, browserSync.reload))
}
gulp.task('build', gulp.series("cleanDist","buildCss", "buildJs", 'minifyHtml', "minifyImages"));
gulp.task('dev', startWatching);




let project_folder = "dist"
let source = "src"

let path={
    build: {
        html: project_folder+"/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        cur: project_folder + "/",
        img: project_folder + "/img/"
    },
    src: {
        html: source +"/*.html",
        css: source + "/scss/*.scss",
        js: source + "/js/*.js",
        cur: source +"/*.cur",
        img: source + "/img/*"
    },
    watch: {
        html: source +"/**/*.html",
        css: source + "/scss/**/*.scss",
        js: source + "/js/**/*.js",
        img: source + "/img/*"
    },
    clean:"./" + project_folder + "/"
}


let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    del = require('del'),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass'),
    browsersync = require('browser-sync').create()

function browserSync(params){
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false,
    })
}

function html(){
    return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function img(){
    return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function cur(){
    return src(path.src.cur)
    .pipe(dest(path.build.cur))
    .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function clean(params){
    return del(path.clean)
}

function watchFiles(params){
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
}

let build = gulp.series(clean, gulp.parallel(img, cur, js, css, html))
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.html = html
exports.js = js
exports.css = css
exports.build = build
exports.watch = watch
exports.default = watch
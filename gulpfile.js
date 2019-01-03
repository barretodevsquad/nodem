gulp    = require('gulp')
pug     = require('gulp-pug')
mcss    = require('gulp-mcss')
sass    = require('gulp-sass')
concat  = require('gulp-concat')
uglify  = require('gulp-uglify')
connect = require('gulp-connect')
babel   = require('gulp-babel')

gulp.task('styles', () => {
    gulp.src(['src/scss/main.scss'])
        .pipe(sass())
        .pipe(mcss())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload())
})

gulp.task('fonts', () =>{
    gulp.src(
        [
         'src/fonts/*'
            // 'node_modules/bootstrap/dist/fonts/*',
            // 'node_modules/bootstrap/dist/fonts/*',
            // 'node_modules/font-awesome/fonts/*',
        ]
    )
    .pipe(gulp.dest('build/fonts'))
    .pipe(connect.reload())
})

gulp.task('images', () =>{
    gulp.src(
        [
            'src/images/*',
        ]
    )
    .pipe(gulp.dest('build/img'))
    .pipe(connect.reload())
})

gulp.task('pug', () =>{
    gulp.src('src/templates/*.pug')
   .pipe(pug())
   .pipe(gulp.dest('build'))
   .pipe(connect.reload())
})

gulp.task('js', () => {
    gulp.src([
             // 'node_modules/jquery/dist/jquery.min.js',
             // 'node_modules/bootstrap/dist/js/bootstrap.js',
             // 'node_modules/particlesjs/dist/particles.js',
             // 'node_modules/jquery.nicescroll/dist/jquery.nicescroll.js',
             // 'node_modules/waypoints/lib/jquery.waypoints.js',
             'src/js/*.js'
             ])
    // .pipe(uglify())
    // .pipe(babel())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload())
})

// gulp.task('sworker', () => {
//     gulp.src([
//              'service-worker.js',
//              'manifest.json',
//              ])
//     .pipe(gulp.dest('build/'))
//     .pipe(connect.reload())
// })

// server
gulp.task('server', () => {
    connect.server({
     root: ['build'],
        // https: true,
        livereload: true,
        // port: 443,
        port: 8081,
    })
})

gulp.task('watch', () =>{
    gulp.watch(['src/scss/*'  ], ['styles'])
    gulp.watch(['src/images/*'  ], ['images'])
    gulp.watch(['src/*/*.pug'], ['pug'])
    gulp.watch(['src/js/*.js'], ['js'])
    // gulp.watch(['/*.js'], ['sworker'])
    // gulp.watch(['/*.json'], ['sworker'])
})

gulp.task('default',
    [
        'styles',
        'fonts',
        'images',
        'pug',
        // 'sworker',
        'js',
        'server',
        'watch',
    ]
);

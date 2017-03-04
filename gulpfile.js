/**
 * Created by zht on 2017/2/27.
 */
'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    cleanCss = require('gulp-clean-css'),
    mocha = require('gulp-mocha'),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    istanbul = require('gulp-istanbul'),
    eslint = require('gulp-eslint');

var paths = {
    js: [
        'public/thirdparty/cloudplay/config.js',
        'public/thirdparty/cloudplay/cloudplay.js'
    ],
    testjs: [
        'public/thirdparty/cloudplay/config-test.js',
        'public/thirdparty/cloudplay/cloudplay.js'
    ],
    devjs: [
        'public/thirdparty/cloudplay/config-dev.js',
        'public/thirdparty/cloudplay/cloudplay.js'
    ],
    demojs: [
        'public/thirdparty/cloudplay/config-demo.js',
        'public/thirdparty/cloudplay/cloudplay.js'
    ],
    payjs: [
        'public/thirdparty/cloudplay/config-pay.js',
        'public/thirdparty/cloudplay/cloudplay.js'
    ],
    reljs: [
        'public/thirdparty/cloudplay/config-rel.js',
        'public/thirdparty/cloudplay/cloudplay.js'
    ],
    css: [
        'public/thirdparty/flowplayer/6.0.5/flowplayer.css',
        'public/thirdparty/cloudplay/cloudplay.css',
        'public/thirdparty/jquery-ui/jquery-ui.css'
    ],
    swf: [
        'public/thirdparty/flowplayer/6.0.5/*.swf',
        'public/thirdparty/web-socket-js/WebSocketMain.swf'
    ],
    image: [
        'public/thirdparty/flowplayer/6.0.5/img/*',
        'public/thirdparty/cloudplay/img/*'
    ],
    font: [
        'public/thirdparty/flowplayer/6.0.5/fonts/*'
    ],
    lib: {
        js: [
            'public/thirdparty/jquery/jquery-1.12.4.js',
            'public/thirdparty/flowplayer/6.0.5/flowplayer.js',
            'public/thirdparty/jquery-ui/jquery-ui.js',
            'public/thirdparty/jquery-xdomain/jQuery.XDomainRequest.js',
            'public/thirdparty/countly/countly.js',
            'public/thirdparty/swfobject/swfobject.js',
            'public/thirdparty/web-socket-js/web_socket.js',
            'public/thirdparty/cryptojs/rollup_aes.js',
            'public/thirdparty/cryptojs/mode-ecb.js'
        ],
        css: [
            'public/thirdparty/jquery-ui/jquery-ui.css',
        ]
    }
};

var product_dist_dir = 'public/dist',
    testing_dist_dir = 'public/dist-test',
    develop_dist_dir = 'public/dist-dev',
    demo_dist_dir = 'public/dist-demo',
    pay_dist_dir = 'public/dist-pay',
    rel_dist_dir = 'public/dist-rel';

gulp.task('lint', function() {
    //gulp.src(['app.js', '**/*.js', '!node_modules/**'])
    gulp.src(paths.js)
        .pipe(eslint({
            globals: {
                jQuery: false
            },
            parserOptions: {
                ecmaVersion: 6
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    /*
     .pipe(eslint.result(function(result) {
     console.log('filePath:' + result.filePath);
     console.log('Errors:' + result.errorCount);
     }));
     */
});

gulp.task('test', function() {
    gulp.src(['*.js', './public/thirdpaty/**/*.js'])
        .pipe(istanbul())
        .on('finish', function() {
            gulp.src('tests/*.js')
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .on('end', function() {
                    process.exit();
                })
        })
});

gulp.task('jslib-minify', function() {
    //js lib
    gulp.src(paths.lib.js)
        .pipe(uglify())
        .pipe(gulp.dest(product_dist_dir))
        .pipe(gulp.dest(testing_dist_dir))
        .pipe(gulp.dest(develop_dist_dir))
        .pipe(gulp.dest(demo_dist_dir))
        .pipe(gulp.dest(pay_dist_dir))
        .pipe(gulp.dest(rel_dist_dir));
});

gulp.task('css-concat', function() {
    //css
    gulp.src(paths.css)
        .pipe(concat('saas-sdk.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest(product_dist_dir))
        .pipe(gulp.dest(testing_dist_dir))
        .pipe(gulp.dest(develop_dist_dir))
        .pipe(gulp.dest(demo_dist_dir))
        .pipe(gulp.dest(pay_dist_dir))
        .pipe(gulp.dest(rel_dist_dir));
});

gulp.task('css-copy', function() {
    //css
    gulp.src(paths.lib.css)
        .pipe(cleanCss())
        .pipe(gulp.dest(product_dist_dir))
        .pipe(gulp.dest(testing_dist_dir))
        .pipe(gulp.dest(develop_dist_dir))
        .pipe(gulp.dest(demo_dist_dir))
        .pipe(gulp.dest(pay_dist_dir))
        .pipe(gulp.dest(rel_dist_dir));
});

/*
 gulp.task('dist-clean', function() {
 return gulp.src(dist_dir + '/*', {read: false})
 .pipe(clean());
 });
 */

gulp.task('copy-swf', function() {
    gulp.src(paths.swf)
        .pipe(gulp.dest(product_dist_dir))
        .pipe(gulp.dest(testing_dist_dir))
        .pipe(gulp.dest(develop_dist_dir))
        .pipe(gulp.dest(demo_dist_dir))
        .pipe(gulp.dest(pay_dist_dir))
        .pipe(gulp.dest(rel_dist_dir));
});

gulp.task('copy-font', function() {
    gulp.src(paths.font)
        .pipe(gulp.dest(product_dist_dir + '/fonts'))
        .pipe(gulp.dest(testing_dist_dir + '/fonts'))
        .pipe(gulp.dest(develop_dist_dir + '/fonts'))
        .pipe(gulp.dest(demo_dist_dir + '/fonts'))
        .pipe(gulp.dest(pay_dist_dir + '/fonts'))
        .pipe(gulp.dest(rel_dist_dir + '/fonts'));
});

gulp.task('img-minify', function() {
    gulp.src(paths.image)
        .pipe(imagemin())
        .pipe(gulp.dest(product_dist_dir + '/img'))
        .pipe(gulp.dest(testing_dist_dir + '/img'))
        .pipe(gulp.dest(develop_dist_dir + '/img'))
        .pipe(gulp.dest(demo_dist_dir + '/img'))
        .pipe(gulp.dest(pay_dist_dir + '/img'))
        .pipe(gulp.dest(rel_dist_dir + '/img'));
});

gulp.task('concat-product', function() {
    return gulp.src(paths.js)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('saas-sdk.js'))
        .pipe(gulp.dest(product_dist_dir));
});

gulp.task('concat-testing', function() {
    return gulp.src(paths.testjs)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('saas-sdk.js'))
        .pipe(gulp.dest(testing_dist_dir));
});

gulp.task('concat-develop', function() {
    return gulp.src(paths.devjs)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('saas-sdk.js'))
        .pipe(gulp.dest(develop_dist_dir));
});

gulp.task('concat-pay', function() {
    return gulp.src(paths.payjs)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('saas-sdk.js'))
        .pipe(gulp.dest(pay_dist_dir));
});

gulp.task('concat-demo', function() {
    return gulp.src(paths.demojs)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('saas-sdk.js'))
        .pipe(gulp.dest(demo_dist_dir));
});

gulp.task('concat-rel', function() {
    return gulp.src(paths.reljs)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(concat('saas-sdk.js'))
        .pipe(gulp.dest(rel_dist_dir));
});


gulp.task('default', ['lint', 'copy-swf', 'copy-font', 'css-copy', 'css-concat', 'jslib-minify', 'img-minify', 'concat-product', 'concat-testing', 'concat-develop', 'concat-demo', 'concat-pay', 'concat-rel']);

/**
 * Created by zht on 2017/2/27.
 */
'use strict';

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    clean  = require('gulp-clean');

gulp.task('clean',function(){
    gulp.src(['public/css/*','public/js/*'],{read:false})
        .pipe(clean());
});
//转移js
gulp.task('src-move',function(){
    gulp.src('public/js/*.js')
        .pipe(gulp.dest('dist/js'));
    gulp.src('public/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

// //合并js文件
// gulp.task('scripts-concat',function(){
//    gulp.src('src/js/*.js')
//        .pipe(concat('all.js'))
//        .pipe(gulp.dest('dist/js'))
// });

//压缩css文件
gulp.task('css-min',function(){
    gulp.src('dist/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/css'));
});


//压缩js文件
gulp.task('js-min',function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default',['sass-complie','src-move']);
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	coffee = require('gulp-coffee');
	watch = require('gulp-watch');


gulp.task('default',function(){
	
  return gulp.src('./src/*.coffee')
       .pipe(coffee({bare:true}))
       .pipe(concat('hovercard.js'))
       .pipe(gulp.dest('dist/'))
       .pipe(uglify())
       .pipe(rename({suffix:'.min'}))
       .pipe(gulp.dest('dist/'));

});

gulp.watch('./src/*.coffee',['default']);


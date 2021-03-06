/*
	INCLUDES ______________________________________________________________________
*/

const path = require('path');

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var jshintstylish = require('jshint-stylish');
var conn,ftp_connect;function createFTPconnection(path){
	try{ 
		ftp_connect  = require(path);
		if(ftp_connect.remote_path[ftp_connect.remote_path.length-1]!='/') ftp_connect.remote_path+='/';
		const ftp = require( 'vinyl-ftp' );
		conn = ftp.create( ftp_connect );
	}catch(e){}}
function sendFTP(dest){	return (!conn||!ftp_connect)? gutil.noop():conn.dest( path.join(ftp_connect.remote_path,dest));}

/*
	DIRECTORIES ______________________________________________________________________
	ALWAYS FINISH DIRECTORIES WITH SLASH '/'
*/

/*ftp_connect.json attributes: host, user, password, parallel, log, remote_path
Comment this line if FTP won't be used
*/
createFTPconnection('./ftp_connect.json');

var lib_dir = 'src/lib/';
var src_dir = "src/";

// var build_dir_base = './';
var build_dir_base = 'dist/';
var build_dir = build_dir_base + "particles/";

var html_src = src_dir+'**/*.html';
var html_build = build_dir;
var php_src = src_dir+'**/*.php';
var php_build = build_dir;


var lib_src = [
	// lib_dir+'PATH/TO/EXTERNAL/LIB/LIB_NAME.js',
	lib_dir+'particles.min.js',
];
var lib_css_src = [
	// lib_dir+'PATH/TO/EXTERNAL/STYLES/STYLE_NAME.css',
];
var lib_other_src = [
	// lib_dir+'PATH/TO/OTHER/FILES/LIKE/FONTS/ETC',
];
var lib_build = build_dir+'lib/';


var img_src = src_dir+'img/**';
var img_build = build_dir+'img/';

var others_src = [
	// src_dir+'fonts/*',
	src_dir+'**/*.txt',
]
var others_build = build_dir;

/*
	TASKS ______________________________________________________________________
*/
var tasks = {
	once: [],
	watch: [],
};

/* JAVASCRIPT ____________________________________________________________________________*/

var script_src = src_dir+'js/*.js';
var script_build = build_dir+'js/';
var script_concat = 'particles.js'; // <-----------------

gulp.task('script_err', function() {
	gulp.src(script_src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintstylish));
});

gulp.task('script', function() {
	gulp.src(script_src)
		.pipe(concat(script_concat))
			.pipe(gulp.dest(script_build))
			.pipe(sendFTP('js'))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
			.pipe(gulp.dest(script_build))
			.pipe(sendFTP('js'))
	;
});
gulp.task('script_w', function(){gulp.watch(script_src,['script']);});
gulp.task('script_watch',['script','script_w']);
tasks.once.push('script');
tasks.watch.push('script_w');

/* SCSS ____________________________________________________________________________*/

var scss_src = src_dir+'css/*.scss';
var scss_build = build_dir+'css/';

gulp.task('scss',function(){
	gulp.src(scss_src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions','safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: 'ie9'}))
		.pipe(gulp.dest(scss_build))
		.pipe(sendFTP('css'))
	;
});
gulp.task('scss_w',function(){gulp.watch(scss_src,['scss']);});
gulp.task('scss_watch',['scss','scss_w']);
tasks.once.push('scss');
tasks.watch.push('scss_w');

/* LIBRARIES ____________________________________________________________________________*/
gulp.task('lib', function() {
	gulp.src(lib_src,{base:lib_dir})
		// .pipe(uglify())
		.pipe(gulp.dest(lib_build))
		//.pipe(sendFTP())

	gulp.src(lib_css_src,{base:lib_dir})
		.pipe(cleanCSS({compatibility: 'ie9'}))
		.pipe(gulp.dest(lib_build))
		//.pipe(sendFTP())

	gulp.src(lib_other_src,{base:lib_dir})
		.pipe(gulp.dest(lib_build))
		//.pipe(sendFTP())
});
tasks.once.push('lib');

/* PHP ____________________________________________________________________________*/

gulp.task('php',function() {
	gulp.src(php_src,{base:src_dir})
		.pipe(gulp.dest(php_build))
		//.pipe(sendFTP())
});

gulp.task('php_w', function() { gulp.watch(php_src,['php']);});
gulp.task('php_watch',['php','php_w']);
tasks.once.push('php');
tasks.watch.push('php_w');

/* HTML ____________________________________________________________________________*/
gulp.task('html',function(){
	gulp.src(html_src,{base:src_dir})
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(html_build))
		//.pipe(sendFTP())
	;
});
gulp.task('html_w',function(){gulp.watch(html_src,['html']);});
gulp.task('html_watch',['html','html_w']);
tasks.once.push('html');
tasks.watch.push('html_w');


/* IMAGES ____________________________________________________________________________*/

gulp.task('img', function(){
	gulp.src(img_src)
		.pipe(imagemin())
		.pipe(gulp.dest(img_build))
		//.pipe(sendFTP())
	;
});
gulp.task('img_w', function(){gulp.watch([img_src,img_admin_src],['img']);});
gulp.task('img_watch',['img','img_w']);
tasks.once.push('img');
// tasks.watch.push('image_min_w');

/* OTHERS ____________________________________________________________________________*/
gulp.task('others', function() {
   gulp.src(others_src)
   .pipe(gulp.dest(others_build))
   //.pipe(sendFTP())
});
gulp.task('others_w', function() { gulp.watch(others_src,['others']);});
gulp.task('others_watch',['others','others_w']);
tasks.once.push('others');
// tasks.watch.push('fonts_w');

/* GENERAL ____________________________________________________________________________*/
gulp.task('once',tasks.once);
gulp.task('watch',tasks.watch);
gulp.task('default',['once','watch']);

/*
	VERSIONING & RELASES ______________________________________________________________________
*/

// var git = require('gulp-git');
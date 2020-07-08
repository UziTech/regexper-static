const gulp = require('gulp'),
      _ = require('lodash'),
      notify = require('gulp-notify'),
      folderToc = require('folder-toc'),
      docco = require('gulp-docco'),
      del = require("del"),
      connect = require('gulp-connect'),
      hb = require('gulp-hb'),
      frontMatter = require('gulp-front-matter'),
      rename = require('gulp-rename'),
      config = require('./config'),
      gutil = require('gulp-util'),
      webpackRun = require('webpack'),
      webpackConfig = require('./webpack.config'),
      fs = require('fs');


function watch() {
  gulp.watch(config.globs.other, staticFiles);
  gulp.watch(_.flatten([
    config.globs.templates,
    config.globs.data,
    config.globs.helpers,
    config.globs.partials,
    config.globs.svg_sass
  ]), markup);
  gulp.watch(_.flatten([
    config.globs.sass,
    config.globs.js
  ]), webpack);
  gulp.watch(config.globs.js, docs);
}

function docs() {
  folderToc('./docs', {
    filter: '*.html'
  });
}

function docsFiles() {
  return gulp.src(config.globs.js)
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
}

function server() {
  gulp.watch(config.buildPath('**/*'), function(file) {
    return gulp.src(file.path).pipe(connect.reload());
  });

  return connect.server({
    root: config.buildRoot,
    livereload: true
  });
}

function staticFiles() {
  return gulp.src(config.globs.other, { base: './src' })
    .pipe(gulp.dest(config.buildRoot));
}

function markup() {
  var hbStream = hb({
    data: config.globs.data,
    helpers: config.globs.helpers,
    partials: config.globs.partials,
    parsePartialName: function(option, file) {
      return _.last(file.path.split(/\\|\//)).replace('.hbs', '');
    },
    bustCache: true
  });
  hbStream.partials({
    svg_styles: fs.readFileSync(config.buildRoot + '/css/svg.css').toString()
  });
  if (process.env.GA_PROP) {
    hbStream.data({
      'gaPropertyId': process.env.GA_PROP
    });
  }
  if (process.env.SENTRY_KEY) {
    hbStream.data({
      'sentryKey': process.env.SENTRY_KEY
    });
  }
  return gulp.src(config.globs.templates)
    .pipe(frontMatter())
    .pipe(hbStream)
    .on('error', notify.onError())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(config.buildRoot));
}

function discard() {
  return del('build/__discard__');
}

function clean() {
  return del('build');
}

function webpack(callback) {
  webpackRun(webpackConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString());
    callback();
  });
}

const build = gulp.series(clean, staticFiles, webpack, discard, markup);
exports.build = build;
exports.default = gulp.series(build, server, docsFiles, docs, watch);

///////////////////
// Node Requires //
///////////////////

var sync  = require('browser-sync')
var gulp  = require('gulp')
var jade  = require('gulp-jade')
var shell = require('gulp-shell')
var args  = require('minimist')(process.argv.slice(2))

////////////////////
// Main variables //
////////////////////

var paths = {
  // on osx / linux, convert is supposed to be in PATH
  // on windows, localize the imagemagick convert.exe
  exec: 'convert',
  // exec: 'C:\\ImageMagick\\convert.exe',
  src: args.input ? args.input : ['./*.psd'],
  server: './server/',
  sub: args.input ? args.input.replace('.psd', '') + '/' : ''
}
var img = 'preview' + (args.png ? '.png' : '.jpg')

////////////////
// Gulp Tasks //
////////////////

// launch browsersync server
gulp.task('server', function() {
  sync({
    server: { baseDir: paths.server + paths.sub }
  })
})

// compile the jade index template
gulp.task('jade', function() {
  var align = '0 auto'
  if (args.left)
    align = '0 auto 0 0'
  else if (args.right)
    align = '0 0 0 auto'

  gulp.src(paths.server + 'index.jade')
    .pipe(jade({
      locals: {
        align: align,
        color: args.color ? args.color : '#fff',
        img: img
      }
    }))
    .pipe(gulp.dest(paths.server + paths.sub))
})

// convert psd file
gulp.task('convert', function() {
  var quality = args.png ? ' ' : ' -quality 100 '

  gulp.src(paths.src, { read: false })
    .pipe(shell([
      '"' + paths.exec + '" "<%= file.path %>"[0]' + quality + paths.server + paths.sub + img
    ]))
    .on('end', function() {
      sync.reload()
    })
})

// default gulp task
gulp.task('default', ['jade', 'convert', 'server'], function() {
  gulp.watch(paths.src, ['convert'])
})

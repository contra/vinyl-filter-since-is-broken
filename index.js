var since = require('vinyl-filter-since');
var through2 = require('through2');
var File = require('vinyl');

var success = new File({
  cwd: "/",
  base: "/test/",
  path: "/test/file.coffee",
  contents: new Buffer("test = 123"),
  stat: {
    mtime: new Date('2015-03-17 13:27:54')
  }
});

var stream = since(new Date('2015-03-16 13:27:54'));
var pass = through2.obj();

stream.once('finish', function(){
  console.log('finish');
});

stream.once('end', function(){
  console.log('end');
});

pass.pipe(stream);

pass.write(success);
pass.write(success);
pass.write(success);
pass.end();
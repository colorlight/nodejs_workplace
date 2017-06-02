const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

var workdir = path.resolve('.');
var viewspath = path.join(workdir,'static','blog','blogviews');
function createEnv(path, opts) {
    var
        autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(viewspath, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});



var s = env.render('view_nunjucks.html');

fs.writeFile('static/blog/blog_nunjucks.html',s , err => {console.log('finish write file')});


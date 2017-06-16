const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

const https = require('https');

const http = require('http');

const isProduction = process.env.NODE_ENV === 'production';

const fs = require('fs');

const enforceHttps = require('koa-sslify');


//force https on all page
app.use(enforceHttps());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});


// static file support:
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());


/*https ca config file */ 
var options = {
    key: fs.readFileSync('/root/https_ca/214090097510805.key'),
    cert: fs.readFileSync('/root/https_ca/214090097510805.pem')
}

http.createServer(app.callback()).listen(80);
https.createServer( options, app.callback()).listen(443);

console.log('app started at port 443');
console.log('app started at port 80');

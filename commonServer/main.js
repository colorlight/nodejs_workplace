'use strict'

var http = require('http');
var router = require('./router');

var url = '';
var baseURL = '/home/lighting/webTech/GitPrj/myblog'
var server = http.createServer(function(request,response){
    console.log(request.method + ':' + request.url);   
    router(request,response);
})

server.listen(8081);

console.log('Server is running at http://localhost:8081');
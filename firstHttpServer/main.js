'use strict'

var http = require('http');
var myWebsite = require('./readFile').myWebsite;
var mime = require('mime');

var baseURL = '/home/lighting/webTech/GitPrj/myblog'
var url = '';
var server = http.createServer(function(request,response){
    console.log(request.method + ':' + request.url);   
    if(request.url === '/'){
        url = baseURL + request.url + 'myblog.html';
         
    }else{
        url = baseURL + request.url;
    }
    var content_type = mime.lookup(url);
    response.writeHead(200, {'Content-Type': mime.lookup(url)});
    myWebsite(response, url, content_type);
})

server.listen(8080);

console.log('Server is running at http:/localhost:8080');
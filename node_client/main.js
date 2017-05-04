'use strict'
var http = require('http');

var options = {
    host: '172.24.53.223',
    port: 8081,
    path: '/',
    method: 'GET'
};

console.log(options)
var req = http.request(options, function(res){
    console.log('Status:' + res.statusCode);
    console.log('HEADERS ' + JSON.stringify(res.headers));

    res.setEncoding('utf8');
    res.on('data', function(chunk){
        console.log(chunk);
    })
})


'use strict'

var https = require('https');
var fs = require('fs');
var router = require('./router');

/*https ca config file */ 
var options = {
    key: fs.readFileSync('/home/lighting/nodejs/httpsCA/214090097510805.key'),
    cert: fs.readFileSync('/home/lighting/nodejs/httpsCA/214090097510805.pem')
};


(function hahas(){
    console.log(23)
})();


var a = 1;

var server = https.createServer(options,function(request,response){
    console.log(request.method + ':' + request.url);   
    console.log(a);
    router(request,response);
})

server.listen(443);

console.log('Server is running at https://localhost:443');

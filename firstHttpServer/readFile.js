'use strict'

var fs = require('fs');

function myWebsite(response, url, charset){
    if(/text/.test(charset)){
        fs.readFile(url, 'utf-8',function(err,data){
            if(err){
                console.log(err);
                response.end('<h1>something wrong has happened</h1>');
            }else{
                console.log(url);
                response.end(data);
            }
        })
    }else{
        fs.readFile(url, function(err,data){
            if(err){
                console.log('what ever');
            }
            else{
                response.end(data);
            }
        })
    }
}

module.exports = {
    myWebsite: myWebsite
}
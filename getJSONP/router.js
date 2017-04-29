var mime = require('mime');
var fs = require('fs');
var genData = require('./genData');

var router = function(request,response){
    var charset='utf-8',
        indexHtml = 'myblog.html',
        basePath = '/home/lighting/webTech/GitPrj/myblog',
        url = request.url;
        method = request.method;

    var data = genData();

    if(method === 'GET'){
        /*if url include path /api/.., then return json data*/
        if(url.match(/\/api\//)){
            response.writeHead(200,{'Content-Type':'application/json;charset=' + charset});
            response.end(JSON.stringify(data));
            return;
        }
        /*if callback exist , it is jsonp*/
        var callbackName = '';
        if(callbackName = url.match(/callback=([^&]*)/)[1]){
             response.writeHead(200,{'Content-Type':'text/javascript'});
             response.end(callbackName + '({mypeniusinch: \'10cm\', mygirlsboos:\'Dcup\'},{password:584693})');
             return;
        }
        if(true){
            /*handle the file path*/
            var filePath = '';
            if(url === '/'){
                filePath = basePath + url + indexHtml; 
            }else{
                filePath = basePath + url;
            }

            var responseContentType = mime.lookup(filePath);
            response.writeHead(200,{'Content-Type':responseContentType});
            /*response body text or bin*/
            if(responseContentType.indexOf('text/') !== -1){
                fs.readFile(filePath,charset,function(err,data){
                    if(err){
                        console.log('error:' + err);
                        response.end(err);
                    }else{
                        response.end(data);
                    }
                })
            }else{
                fs.readFile(filePath, function(err,data){
                       if(err){
                        console.log('error:'+ err);
                        response.end(err.toString());
                    }else{
                        response.end(data);
                    }
                })
            }
        
        }
    }
}

module.exports = router;
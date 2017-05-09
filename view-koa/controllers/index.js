// index:
var fs = require('mz/fs');
var path = require('path')

module.exports = {
    'GET /': async (ctx, next) => {
         var fp = path.join(__dirname,'..','static','index.html');
         if (await fs.exists(fp)){
            ctx.response.type = 'text/html';
            ctx.response.body = await fs.readFile(fp);
        }
    }
};

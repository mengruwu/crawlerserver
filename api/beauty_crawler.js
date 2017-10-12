var request = require('request'),
    cheerio = require('cheerio');
const head_url = 'https://www.ptt.cc';
var ret = [];
var getBeautyUrl = function (page) {
    var req_urls = [];
    request('https://www.ptt.cc/bbs/Beauty/index' + page + '.html', function(err, res, body) {
        if(err) console.log(err);

        var $ = cheerio.load(body);
        $('div.title a').each(function(i, e){
            var title = $(this).text();
            var href = head_url + $(this).attr('href');
            getBeauty(title, href, setRet);
        });
    });
    
}

var setRet = function(title, href, children) {
    ret.push({
        title: title, 
        href: href,
        children: children
    });
    console.log(title);
    console.log(children);
}

var getBeauty = function(title, href, callback) {
    var children = [], flag = 0;
    request(href, function(_,_,body) {
        var $ = cheerio.load(body);
        $('a').each(function(i, e) {
            var src = $(this).attr('href');
            if(src[src.length-1] == 'g')
                children.push(src);
        });
        callback(title, href, children);
    })
}

module.exports = function(page) {
    getBeautyUrl(page);
    return JSON.stringify(ret) ;
}
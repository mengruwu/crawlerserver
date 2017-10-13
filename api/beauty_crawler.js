var request = require('request'),
    cheerio = require('cheerio');
const head_url = 'https://www.ptt.cc';
var ret = {};
var getBeautyUrl = function (page) {
    if(ret[page] == undefined) {
        ret[page] = [];
        request('https://www.ptt.cc/bbs/Beauty/index' + page + '.html', function(err, res, body) {
            if(err) console.log(err);

            var $ = cheerio.load(body);
            $('div.title a').each(function(i, e){
                var title = $(this).text();
                var href = head_url + $(this).attr('href');
                getBeauty(page, title, href, setRet);
            });
        });
    }
    
}

var setRet = function(page, title, href, children) {
    if(children.length <= 3)return;
    ret[page].push({
        title: title, 
        href: href,
        children: children
    });
    //console.log(title);
    //console.log(children);
}

var getBeauty = function(page, title, href, callback) {
    var children = [], flag = 0;
    request(href, function(_, _, body) {
        var $ = cheerio.load(body);
        $('a').each(function(i, e) {
            var src = $(this).attr('href');
            if(src[src.length-1] == 'g' && src[src.length-2] == 'p')
                children.push(src);
        });
        callback(page, title, href, children);
    })
}

module.exports = function(page) {
    getBeautyUrl(page);
    return JSON.stringify(ret[page]) ;
}
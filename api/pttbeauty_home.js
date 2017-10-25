var request = require('request'),
cheerio = require('cheerio');

const req_url = 'https://www.ptt.cc/bbs/Beauty/index.html';
const head_url = 'https://www.ptt.cc';
var myRequest = request(req_url)
var ret_url;

request(req_url, function(err, res, body) {
    if(err) console.log(err);
    else {
        var $ = cheerio.load(body);
        $('div.btn-group-paging a').each(function(i, e){
            var href = $(this).attr('href');
            if(i == 1) {
                setUrl( head_url + href );
                return;
            }
        });
    }
});

var setUrl = function (s) {
    ret_url = s;
}

module.exports = function () {
    var sub = ret_url.substr(ret_url.length-9, 4);
    var tmp = parseInt(sub) + 1;
    var ret = { home: tmp.toString() };
    return JSON.stringify(ret);
};
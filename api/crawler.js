var request = require('request'),
    cheerio = require('cheerio');

const all_top100d_url= 'https://www.kkbox.com/tw/tc/playlist/WsBmMkPCp1sPkyeZZI';
const ch_top100d_url = 'https://www.kkbox.com/tw/tc/playlist/8m6bbC8bdzM77nF1G0';
const ch_top100w_url = 'https://www.kkbox.com/tw/tc/playlist/Cqmn25nPpwXna3VVZs';
const we_top100d_url = 'https://www.kkbox.com/tw/tc/playlist/T_2R6EtY0IEq8QPWIz';
const we_top100w_url = 'https://www.kkbox.com/tw/tc/playlist/CmOXM14ytJ3NfU_hRF';
var all_top100d_titles = [];
var ch_top100d_titles = [];
var ch_top100w_titles = [];
var we_top100d_titles = [];
var we_top100w_titles = [];

request(all_top100d_url, function(err, res, body) {
    if(err) console.log(err);
    else {
        var $ = cheerio.load(body);
        $('a.song-title').each(function(){
            var title = $(this).attr('title').split('-')[0].split('(')[0];
            all_top100d_titles.push(title);
        });
    }
});

request(ch_top100d_url, function(err, res, body) {
    if(err) console.log(err);
    else {
        var $ = cheerio.load(body);
        $('a.song-title').each(function(){
            var title = $(this).attr('title').split('-')[0].split('(')[0];
            ch_top100d_titles.push(title);
        });
    }
});

request(ch_top100w_url, function(err, res, body) {
    if(err) console.log(err);
    else {
        var $ = cheerio.load(body);
        $('a.song-title').each(function(){
            var title = $(this).attr('title').split('-')[0].split('(')[0];
            ch_top100w_titles.push(title);
        });
    }
});


request(we_top100d_url, function(err, res, body) {
    if(err) console.log(err);
    else {
        var $ = cheerio.load(body);
        $('a.song-title').each(function(){
            var title = $(this).attr('title').split('-')[0].split('(')[0];
            we_top100d_titles.push(title);
        });
    }
});

request(we_top100w_url, function(err, res, body) {
    if(err) console.log(err);
    else {
        var $ = cheerio.load(body);
        $('a.song-title').each(function(){
            var title = $(this).attr('title').split('-')[0].split('(')[0];
            we_top100w_titles.push(title);
        });
    }
});

module.exports = function() {
    var ret = {
            alld: all_top100d_titles,
            chd: ch_top100d_titles,
            chw: ch_top100w_titles,
            wed: we_top100d_titles,
            wew: we_top100w_titles
        };
    return JSON.stringify(ret) ;
}
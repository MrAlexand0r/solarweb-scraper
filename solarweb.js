var request = require('request').defaults({ jar: true });
var cheerio = require('cheerio');

var fs = require('fs');

var isLoggedIn = false;

module.exports = {
    login: (name, pw, callback) => {
        if (!name || !pw) { callback(false); return; }
        request.get('https://www.solarweb.com/', (err, res, body) => {
            if(err) { callback(false); return; }
            var $ = cheerio.load(body);
            var token = $('#user-login-form > input[type="hidden"]:nth-child(1)').val();
            console.log($('#user-login-form > input[type="hidden"]:nth-child(1)').val()); // login form token
            var postData = {
                form: {
                    __RequestVerificationToken: token,
                    UserName: name,
                    Password: pw,
                    ReturnUrl: "",
                    RememberMe: false,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            };
            request.post('https://www.solarweb.com/', postData, (err, res, body) => {
                var jsonbody = JSON.parse(res.body);
                if (!err) {
                    if (jsonbody.data && jsonbody.data.url) {
                        isLoggedIn = true;
                        callback(true);
                    }
                    else callback(false);
                }
            });
        })
    },
    getEnergyChartByDay: (pvSysId, date, callback) => {
        if (!isLoggedIn || !pvSysId || !date || !date.day || !date.month || !date.year) { callback(false); return; }
        var dateUrl = date.year + '/' + date.month + '/' + date.day;
        var url = 'https://www.solarweb.com/Chart/GetChart/' + pvSysId + '/' + dateUrl + '/Day/production';
        //console.log(request.cookie());
        request.get({ 'url':url, accept:'application/json'}, (err, response, body) => {
            if (!err) {
                console.log(body);
                callback(JSON.parse(body));
            } else callback(false);
        });
    }
};

var request = require('request');

var headers = {
    'Origin': 'https://www1.president.go.kr',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Referer': 'https://www1.president.go.kr/petitions/?c=0&only=1&page=6&order=2',
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
    'Cookie': '_ga=GA1.3.582387634.1554678016; _gid=GA1.3.1387185380.1554678016'
};

var dataString = 'c=0&only=1&page=6&order=2';

var options = {
    url: 'https://www1.president.go.kr/api/petitions/list',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);

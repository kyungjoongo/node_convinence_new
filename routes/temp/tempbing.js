

var axios = require('axios');
var cheerio = require("cheerio");

axios({
    method: 'get',
    url: 'https://www.bing.com/visualsearch/Microsoft/CelebsLikeMe?&img++url=https%3A%2F%2Fbingvsdevportalprodgbl.blob.core.windows.net%2Fdemo-images%2F0bfffd12-a701-4d29-9406-63262b87a939.png&imgurl=https%3A%2F%2Fbingvsdevportalprodgbl.blob.core.windows.net%2Fdemo-images%2Fa82a3ea4-4477-4db1-982c-5d9374b705e5.jpg',
    timeout: 7000,
}).then(response => {
    //console.log('######## arrays--->', response.data);


    let body= response.data;
    var $ = cheerio.load(body);

    console.log("body===>", body);


    $('.result_win').each(function () {

        console.log( $(this).html());


    });


}).catch(err => {
    alert('fetch error');
    //ToastAndroid.show('Sorry. fetch error :)', ToastAndroid.LONG);
    this.setState({
        loading: false,
    });
});


https://www.bing.com/images/api/custom/knowledge?q=&rshighlight=true&textDecorations=true&internalFeatures=share&skey=BOAgBdHOia64vsa7qGeYmB-lwY0Cu1SVgyTAbIYrrog&safeSearch=Strict&mkt=ko-kr&setLang=ko-kr&IG=CF2D7446183D407AADE06534BBB941A9&IID=idpins&SFX=1

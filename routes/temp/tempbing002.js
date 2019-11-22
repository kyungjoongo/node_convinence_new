var axios = require('axios');
var cheerio = require("cheerio");

axios({
    method: 'post',
    url: 'https://starbyface.com/Home/LooksLike?url=http://gazua.kyungjoongo.shop:4000/images/temp_image6120745327201.jpg',
    timeout: 15 * 1000,
}).then(response => {
    //console.log('######## arrays--->', response.data);

    let body = response.data;

    // console.log("sldkflsdkfldskf===>", body);

    var $ = cheerio.load(body);

    //$('#candidates').html()

    let results = [];
    $('.candidate').each(function () {

        let image = $(this).find('.img-thumbnail').attr('src')
        let percentage = $(this).find('.progress-bar').attr('similarity');
        //candidate-main"
        let name = $(this).find('.candidate-main > p ').text();

        console.log("sldkflsdkfldskf===>", image)
        console.log("prgress===>", percentage)

        results.push({
            image: image,
            percentage: percentage,
            name: name,
        })
    });


    console.log("results===>", results);


}).catch(err => {
    //ToastAndroid.show('Sorry. fetch error :)', ToastAndroid.LONG);

    console.log("sldkflsdkfldskf===>", err);
});




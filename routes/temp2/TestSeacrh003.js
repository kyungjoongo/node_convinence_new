const imageSearch = require('image-search-google');
const client = new imageSearch('007828852513579057554:b1l_axphzqs', 'AIzaSyAlfytAQccsUnNgLWXsC9RIB3DrJsElRhU');
var options = {page: 1};
client.search('하지원', options).then(images => {

    /*
    [{
        'url': item.link,
        'thumbnail':item.image.thumbnailLink,
        'snippet':item.title,
        'context': item.image.contextLink
    }]
     */

    console.log(images)

}).catch(error => console.log(error))


/*


// search for certain size
client.search('Mahatma Gandhi', {size: 'large'});

// search for certain size
client.search('Indira Gandhi', {type: 'face'});
*/

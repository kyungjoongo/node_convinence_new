var youTubeParser = require('youtube-parser-enhanced');

/*youTubeParser.getMetadata('https://www.youtube.com/watch?v=C_vqnySNhQ0')
    .then(
        function (metadata) {
            // Access video info.
            console.log(metadata.keywords);
        }
    );*/

youTubeParser.getURL('https://youtu.be/C_vqnySNhQ0', {quality: 'medium', container: 'mp4'})
    .then(
        function (urlList) {
            // Access URLs.
            console.log(urlList[0]);
        }
    );
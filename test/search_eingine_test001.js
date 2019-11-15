//http://www.pictriev.com/facedbj.php?findface&image=http://kyungjoon77.iptime.org:4000/images/IMG_0059.png



var request = require('request');
var api_url = 'http://www.pictriev.com/facedbj.php?findface&image=http://kyungjoon77.iptime.org:4000/images/IMG_0059.png'



var options = {
    url: api_url,
};
request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        console.log(JSON.parse(body))

        let __result =JSON.parse(body);

        console.log(__result.imageid)

        let imageId= __result.imageid;

        let requestUir= 'http://www.pictriev.com/facedbj.php?whoissim&imageid='+ imageId.trim()+  '&faceid=0&lang=ko'

        request.get({
            url: requestUir,
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                console.log(JSON.parse(body))

                let result2 = JSON.parse(body);

                //console.log('live--->'+ result2.age);

                let attrResult=[]
                let celubList = result2.attrs
                let age= result2.age;
                let gender= result2.gender;

                celubList.forEach(item=>{

                    attrResult.push({
                        celub : item[2],
                        resemble : Math.ceil(item[1]* 100) ,
                        image : 'http://www.pictriev.com/imgj.php?facex='+ item[3],
                        age: result2.age,
                        gender: result2.gender[0],
                        genderPercentage:   Math.ceil(result2.gender[1]* 100),
                    })
                })

                console.log('finalResults--->',attrResult);



            }
        });



    } else {

        console.log('sdlkfsldkflsdkf', error)
    }
});

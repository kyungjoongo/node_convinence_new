function getDateTime(prevDay) {

    var date = new Date();

    if ( prevDay !=0){

        date.setDate(date.getDate() + prevDay);
    }


    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year +   month +  day ;

}

console.log('##############'+ getDateTime(-7))
console.log('##############'+ getDateTime(-7))
console.log('##############'+ getDateTime(-7))
var request = require('request').defaults({jar:true});
var fs = require('fs');
var solarweb = require('./solarweb.js');

require('dotenv').config();

solarweb.login(process.env.SW_USERNAME, process.env.SW_PASSWORD, true, (success)=>{
    if(success){
        var today = new Date();
        console.log(today);
        var todayDate = {
            day:today.getDate(),
            month:today.getMonth() + 1,
            year:today.getFullYear()
        };

        solarweb.getEnergyChartByDay(process.env.SW_PVSYSTEMID, todayDate, (response)=>{
            if(!response) return;
            console.log(response);
            generateCsvs(response);
        });
    }
});

function generateCsvs(data){
    var values = data.settings.series;
    values.forEach(function(element) {
        element.data.map((e)=>{return e[0] = new Date(e[0]),e;});
        let csvLines = [];
        element.data.forEach(line=>{
            csvLines.push(line.join(','));
        });
        fs.writeFile(element.name+'.csv', csvLines.join('\n'));
    }, this);
}
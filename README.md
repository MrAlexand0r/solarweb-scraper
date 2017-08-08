# solar.web webscraper

Easy way of reading fronius energy values directly from solar.web in nodejs


## Getting Started

`npm install solarweb --save`

```JavaScript
var solarweb = require('solarweb');
                                        //bool
solarweb.login('username', 'password', rememberme, function callback(success){
    // ... do stuff
});
```
### Only works when logged in:
```JavaScript
var date = {
    year:2017,
    month:8,
    day:8
};
solarweb.getEnergyChartByDay('pvSysId', date, function callback(response){
    // ... do stuff
});
```

**check index.js for an example usage!**

Contribution welcomed :)

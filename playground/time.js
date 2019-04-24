var moment = require('moment');
var createdAt = 1234;
var date = moment(createdAt)
var someTimestap = date.valueOf()
console.log(date.format('h:mm'));
console.log(someTimestap);
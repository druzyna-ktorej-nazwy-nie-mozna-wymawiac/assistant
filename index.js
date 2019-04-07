const { dialogflow, Suggestions } = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');

const welcome = require('./welcome');
const whereToShop = require('./whereToShop');
const showMap = require('./showMap');
// const whenToShop = require('./whenToShop');
const shoppingHour = require('./shoppingHour');
const shoppingHourHome = require('./shoppingHourHome');
const getHomeAddress = require('./getHomeAddress');
const shoppingHourHere = require('./shoppingHourHere');
const locationPermission = require('./locationPermission');
const sunday = require('./sunday');
// const whereToShop = require('whereToShop');

const app = dialogflow({ debug: true });

app.intent('Default Welcome Intent', welcome);
app.intent('where to shop', whereToShop);
app.intent('shopping on specific hour - home - address - choice', showMap);
// app.intent('when to shop', whenToShop);
app.intent('shopping on specific hour', shoppingHour);
app.intent('shopping on specific hour - home', shoppingHourHome);
app.intent('shopping on specific hour - home - address', getHomeAddress);
app.intent('shopping on specific hour - here', shoppingHourHere);
app.intent('shopping on specific hour - here - permission', locationPermission);
app.intent('sunday', sunday);

express().use(bodyParser.json(), app).listen(process.env.PORT || 8080);



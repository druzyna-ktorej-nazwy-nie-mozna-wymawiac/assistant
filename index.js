const { dialogflow } = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');

const welcome = require('./welcome');
const shoppingHour = require('./shoppingHour');
const shoppingHourHome = require('./shoppingHourHome');
const getHomeAddress = require('./getHomeAddress');
const shoppingHourHere = require('./shoppingHourHere');
const locationPermission = require('./locationPermission');
// const whereToShop = require('whereToShop');

const app = dialogflow({ debug: true });

app.intent('Default Welcome Intent', welcome);
app.intent('shopping on specific hour', shoppingHour);
app.intent('shopping on specific hour - home', shoppingHourHome);
app.intent('shopping on specific hour - home - address', getHomeAddress);
app.intent('shopping on specific hour - here', shoppingHourHere);
app.intent('shopping on specific hour - here - permission', locationPermission);
// app.intent('where to shop', whereToShop);

express().use(bodyParser.json(), app).listen(process.env.PORT || 8080);



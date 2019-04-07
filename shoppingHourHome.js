//skopiuj do elsa ogarnainie axiosa po prostu

require('dotenv').config();

let baseUrlHere="https://geocoder.api.here.com/6.2/geocode.json?";
let id = process.env.id;
let code = process.env.code;
let baseUrlQwise="http://172.20.47.74:8080/api/best_shop";

const axios = require('axios');
let results = require("./results");

const shoppingHourHome = async (conv, parameters) => {

    if(!conv.user.storage.homeStreet){
    conv.ask('Wygląda na to, że nie znam jeszcze Twojego adresu. Podaj go, aby przejść dalej.');}
    else{
        let ul=conv.user.storage.homeStreet;
        if(conv.user.storage.homeLat){
            conv.ask(`super, wiem,że mieszkasz na ${ul}`)
        }else{
            let city=encodeURIComponent(conv.user.storage.homeCity);

            console.log(baseUrlHere + id +code+"&searchtext="+ conv.user.storage.homeStreet+"+"+conv.user.storage.homeNumber+"+"+city);
            const resHere = await axios.get(baseUrlHere + id +code+"&searchtext="+ conv.user.storage.homeStreet+"+"+conv.user.storage.homeNumber+"+"+city);

            conv.user.storage.homeLat=resHere.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
            conv.user.storage.homeLon=resHere.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;

            console.log(conv.user.storage);
            conv.ask(`super, wiem,że mieszkasz na ${ul}`)
        }

        conv.ask(getResults(conv, conv.user.storage.hour, conv.user.storage.homeLat, conv.user.storage.homeLon));

    }
};

module.exports = shoppingHourHome;
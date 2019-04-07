require('dotenv').config();
const { List, Image } = require('actions-on-google');


let baseUrlHere="https://geocoder.api.here.com/6.2/geocode.json?";
let id = process.env.id;
let code = process.env.code;
let baseUrlQwise="http://172.20.47.74:8080/api/best_shop";
let results = require("./results");
// http://172.20.47.74:8080/api/best_shop?date_time=2017-07-12T16:30:00Z&lat=50.064500&lng=19.923480
const axios = require('axios');
const getHomeAddress = async (conv, parameters) => {
    console.log(parameters);

    conv.user.storage.homeCity =  parameters.full_street_name.city;
    conv.user.storage.homeStreet =  parameters.full_street_name.street;
    conv.user.storage.homeNumber =  parameters.full_street_name.building != null ? parameters.full_street_name.building : "";
    conv.user.storage.homeAddress = "Poland, " + parameters.full_street_name.city + " " + parameters.full_street_name.street + " " + parameters.full_street_name.building;

    console.log(conv.user.storage.homeAddress);

    let city=encodeURIComponent(conv.user.storage.homeCity);

    console.log(baseUrlHere + id +code+"&searchtext="+ conv.user.storage.homeStreet+"+"+conv.user.storage.homeNumber+"+"+city);
    const resHere = await axios.get(baseUrlHere + id +code+"&searchtext="+ conv.user.storage.homeStreet+"+"+conv.user.storage.homeNumber+"+"+city);

    conv.user.storage.homeLat=resHere.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
    conv.user.storage.homeLon=resHere.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;

    console.log(conv.user.storage);
    // results.getResults('2017-07-12T16:30:00Z&', conv.user.storage.homeLat, conv.user.storage.homeLon);
    // console.log(baseUrlQwise+"?date_time=2017-07-12T16:30:00Z&"+"lat="+conv.user.storage.homeLat+"&lng="+conv.user.storage.homeLon);
    // const resQwise=await axios.get(baseUrlQwise+"?date_time="+conv.user.storage.hour+"Z&"+"lat="+conv.user.storage.homeLat+"&lng="+conv.user.storage.homeLon);
    //
    // let tmp=resQwise.data.bestNearset.shop.name;
    // console.log(resQwise.data.bestNearset.shop.name);
    // conv.ask(`${tmp}`);


    if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
        conv.ask('Sorry, try this on a screen device or select the ' +
            'phone surface in the simulator.');
        return;
    }

    conv.ask('Oto lista najlepszych sklepów do odwiedzenia.');
// Create a list
    conv.ask(results.getResults(conv, conv.user.storage.hour,conv.user.storage.lat,conv.user.storage.lon));

    conv.ask("Czy chcesz zobaczyć któreś z nich na mapie?")

};

module.exports = getHomeAddress;


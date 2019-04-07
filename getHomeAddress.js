let baseUrlHere="https://geocoder.api.here.com/6.2/geocode.json?";
let id=process.env.id;
let code=process.env.code;
let baseUrlQwise="http://172.20.47.74:8080/api/best_shop";

require('dotenv').config();
// http://172.20.47.74:8080/api/best_shop?date_time=2017-07-12T16:30:00Z&lat=50.064500&lng=19.923480
const axios = require('axios');
const getHomeAddress = async (conv, parameters) => {
    console.log(parameters);

    conv.user.storage.homeCity =  parameters.full_street_name.city;
    conv.user.storage.homeStreet =  parameters.full_street_name.street;
    conv.user.storage.homeNumber =  parameters.full_street_name.building != null ? parameters.full_street_name.building : "";
    conv.user.storage.homeAddress = "Poland, " + parameters.full_street_name.city + " " + parameters.full_street_name.street + " " + parameters.full_street_name.building;

    console.log(conv.user.storage.homeAddress);
    console.log(baseUrlHere + id +code+"&searchtext="+ conv.user.storage.homeStreet+"+"+conv.user.storage.homeNumber+"+"+conv.user.storage.homeCity);


    const resHere = await axios.get(baseUrlHere + id +code+"&searchtext="+ conv.user.storage.homeStreet+"+"+conv.user.storage.homeNumber+"+"+conv.user.storage.homeCity);


    conv.user.storage.homeLat=resHere.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
    conv.user.storage.homeLon=resHere.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;

    console.log(conv.user.storage);
    // console.log(baseUrlQwise+"?date_time=2017-07-12T16:30:00Z&"+"lat="+conv.user.storage.homeLat+"&lng="+conv.user.storage.homeLon);
    // const resQwise=await axios.get(baseUrlQwise+"?date_time="+conv.user.storage.hour+"Z&"+"lat="+conv.user.storage.homeLat+"&lng="+conv.user.storage.homeLon);
    //
    // let tmp=resQwise.data.bestNearset.shop.name;
    // console.log(resQwise.data.bestNearset.shop.name);
    // conv.ask(`${tmp}`);
    conv.ask("ale super  jesteś !")
};

module.exports = getHomeAddress;
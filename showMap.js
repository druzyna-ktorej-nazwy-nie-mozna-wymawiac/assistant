const SELECTED_ITEM_RESPONSES = {
    'SELECTION_KEY_OPTIMAL': 'You selected the first item',
    'SELECTION_KEY_FASTEST': 'You selected the Google Home!',
    'SELECTION_KEY_COMFY': 'You selected the Google Pixel!',
};

//
// app.intent('actions.intent.OPTION', (conv, params, option) => {
//     let response = 'You did not select any item';
//     if (option && SELECTED_ITEM_RESPONSES.hasOwnProperty(option)) {
//         response = SELECTED_ITEM_RESPONSES[option];
//     }
//     conv.ask(response);
// });

const { BasicCard, Button, Image } = require('actions-on-google');


const showMap = (conv, params, option) => {
    let res = conv.user.storage.options;
    let lat = 0;
    let lon = 0;
    let userLat = conv.user.storage.homeLat;
    let userLon = conv.user.storage.homeLon;

    console.log("   showwwwwwwwwwwwwwwwwwwwwwwwwwww maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaap")
    let chosen = "";

    if (option === 'SELECTION_KEY_OPTIMAL') {
        lat = res.bestOverall.shop.lat;
        lon = res.bestOverall.shop.lng;
        chosen = res.bestOverall;
        conv.ask("OPTYMALNIE");
    } else if (option === 'SELECTION_KEY_FASTEST'){
        lat = res.bestNow.shop.lat;
        lon = res.bestNow.shop.lng;
        chosen = res.bestNow;
        conv.ask("NAJSZYBSZA");
    } else{
        lat = res.bestNearest.shop.lat;
        lon = res.bestNearest.shop.lng;
        chosen=res.bestNearest;
        conv.ask("WYGODNA");
    }
    url = "https://www.google.com/maps/dir/?api=1&origin=" + userLat + "+" + userLon + "&destination=" + lat + "+" + lon + "&travelmode=walking";
    console.log(url);
    console.log(option);
    conv.ask(new BasicCard({
        title: `${chosen.shop.name}`,
        buttons: new Button({
            title: "Nawiguj",
            url: `${url}`
        })
    }))
};

module.exports = showMap;
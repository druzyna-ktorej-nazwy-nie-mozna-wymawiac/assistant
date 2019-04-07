const { BrowseCarousel, BrowseCarouselItem,  Image } = require('actions-on-google');

exports.getResults = function (conv, datetime, lat, lon){
    // console.log(baseUrlQwise+"?date_time=2017-07-12T16:30:00Z&"+"lat="+conv.user.storage.homeLat+"&lng="+conv.user.storage.homeLon);
    // const resQwise=await axios.get(baseUrlQwise+"?date_time="+conv.user.storage.hour+"Z&"+"lat="+conv.user.storage.homeLat+"&lng="+conv.user.storage.homeLon);
    //
    // let tmp=resQwise.data.bestNearset.shop.name;
    // console.log(resQwise.data.bestNearset.shop.name);
    // conv.ask(`${tmp}`);


    let res = {}

    axios.get(`https://03f259e9.ngrok.io/api/best_shop?date_time=${time}&lat=${lat}&lng=${lng}`)
    .then(response => {
        res = response.body()
    })
    .catch(err => {
        console.log(err.message);
        
    })

    let userLat = conv.user.storage.homeLat;
    let userLon = conv.user.storage.homeLon;

    let urlOpt =  "https://www.google.com/maps/dir/?api=1&origin=" + userLat + "+" + userLon + "&destination=" + res.bestOverall.shop.lat + "+" + res.bestOverall.shop.lng + "&travelmode=walking";
    let urlNow =  "https://www.google.com/maps/dir/?api=1&origin=" + userLat + "+" + userLon + "&destination=" + res.bestNow.shop.lat + "+" + res.bestNow.shop.lng + "&travelmode=walking";
    let urlNearest =  "https://www.google.com/maps/dir/?api=1&origin=" + userLat + "+" + userLon + "&destination=" + res.bestNearest.shop.lat + "+" + res.bestNearest.shop.lng + "&travelmode=walking";

 

    let toReturn = new BrowseCarousel({
        items: [
            new BrowseCarouselItem({
                title: 'Optymalna',
                url: `${urlOpt}`,
                description: '' + res.bestOverall + '\n Czas przejścia: \n Czas oczekiwania w kolejce: ',
                image: new Image({
                    url: 'https://i.ibb.co/1L8DH75/baseline-access-time-black-48dp.png',
                    alt: 'Image alternate text',
                }),
            }),
            new BrowseCarouselItem({
                title: 'Najszybsza',
                url: `${urlNow}`,
                description: '' + res.bestNow.shop.name +  '\n Czas przejścia: \n Czas oczekiwania w kolejce: ',
                image: new Image({
                    url: 'https://i.ibb.co/1L8DH75/baseline-access-time-black-48dp.png',
                    alt: 'Image alternate text'
                }),
            }),
            new BrowseCarouselItem({
                title: 'Wygodna',
                url: `${urlNearest}`,
                description: '' + res.bestNearest.shop.name +  '\n Czas przejścia: \n Czas oczekiwania w kolejce: ',
                image: new Image({
                    url: 'https://i.ibb.co/Lv1JdmB/baseline-mood-black-48dp.png',
                    alt: 'Image alternate text',
                }),
            }),
        ],
    });

    return toReturn;
};

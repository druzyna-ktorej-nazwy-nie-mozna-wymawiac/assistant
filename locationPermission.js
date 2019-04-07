
const locationPermission =(conv, permissionGranted) => {
    if(!permissionGranted){
        conv.ask("Nie mogę Ci pomóc, podaj jakiś adres.")
    } else{


        conv.user.storage.lat = conv.device.location.coordinates.latitude;
        conv.user.storage.lon = conv.device.location.coordinates.longitude;
        //
        console.log(conv.user.storage.lat, conv.user.storage.lon);
        conv.ask("Dziena za lokalizacje.");


    }
}

module.exports = locationPermission;

const shoppingHourHome = conv => {

    if(!conv.user.storage.homeStreet){
    conv.ask('Niestety, nie wiem gdzie mieszkasz. Powiedz mi to.');}
    else{
        let ul=conv.user.storage.homeStreet;
        conv.ask(`super, wiem,że mieszkasz na ${ul}`)
    }
};

module.exports = shoppingHourHome;
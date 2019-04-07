const shoppingHour = (conv,params) => {
    let time=params.when.date_time.split("+")[0];

    conv.user.storage.hour = time;
    // console.log(tmp);
    conv.ask('Z domu czy z obecnej lokalizacji?');
}

module.exports = shoppingHour;
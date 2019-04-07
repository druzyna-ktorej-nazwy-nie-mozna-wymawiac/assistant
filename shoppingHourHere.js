const {Permission} = require('actions-on-google');

const shoppingHourHere = conv => {
    conv.ask(new Permission({
        context: 'Aby odpowiedzieć ',
        permissions: 'DEVICE_PRECISE_LOCATION'
    }));
}

module.exports = shoppingHourHere;
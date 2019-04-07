const welcome = (conv) => {

    conv.user.storage={};
    conv.ask('Witaj w QWise!');

};

module.exports = welcome;
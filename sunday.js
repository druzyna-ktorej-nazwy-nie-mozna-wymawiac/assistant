const sunday = (conv,params) => {
    let sunday=params.sunday.split("T")[0];
    sunday=sunday.split("-")[2];
    let sundays=["28","26"];
    if(sunday in sundays){
        conv.ask('Możesz zrobic zakupy w tą niedzielę');

    }
    else{
        conv.ask('Ta niedziela jest niehandlowa');
    }

};

module.exports = sunday;
let results = require("./results");


const whereToShop = (conv) => {
    conv.ask("Oto lista najlepszych sklepów do odwiedzenia.")
    conv.ask(results.getResults(conv,'a','b','c'));
    conv.ask("Czy chcesz zobaczyć któreś z nich na mapie?")

}

module.exports = whereToShop;
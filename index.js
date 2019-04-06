const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const {Permission, dialogflow} = require("actions-on-google");
const dialogflowApp = dialogflow({debug: true});
const app = express();

app.get("/", (req, res) => res.send("online"));
app.post("/dialogflow", express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome() {
    agent.add("Witaj w QWise");
  }

    function shopingHour(params) {
        console.log(params.parameters.when);
        agent.add("Z domu czy z obecnej lokalizacji?");
    }

    function shopingHourLocationHere() {
        console.log(here);
        const options = {
            context: 'Aby odpowiedzieć ',
            // Ask for more than one permission. User can authorize all or none.
            permissions: ['NAME', 'DEVICE_PRECISE_LOCATION'],
        };
        agent.add(new Permission(options));
    }


    // 'ask_for_permission_confirmation': (conv, params, confirmationGranted) => {
    //     const {location} = conv.device;
    //     const {name} = conv.user;
    //     if (confirmationGranted) {
    //         if (name) {
    //             conv.ask(`I'll send the driver your way now ${name.display}.`);
    //         }
    //         if (location) {
    //             // const { latitude, longitude } = location.coordinates;
    //             // you can uncomment the above lines and use the latitude and longitude
    //         }
    //     } else {
    //         conv.ask(`Okay, yeah that's fine. I... didn't really want it anyway.`);
    //     }
    // },
    // }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("shopping on specific hour", shopingHour);
  intentMap.set("shopping on specific hour - here", shopingHourLocationHere);
  agent.handleRequest(intentMap);
});

app.listen(process.env.PORT || 8080);

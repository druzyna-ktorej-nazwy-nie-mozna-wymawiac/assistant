const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
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

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("shopping on specific hour", shopingHour);
  agent.handleRequest(intentMap);
});

app.listen(process.env.PORT || 8080);

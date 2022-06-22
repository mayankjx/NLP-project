const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const analysis = require("./modules/text-analysis");
const twitter_api = require("./modules/twitter-api");
const report = require("./modules/report");
const path = require("path");
require("dotenv").config({ path: "../.env" });
let currentDate = new Date();

const app = express();
app.use(express.static(__dirname + "/public/"));

const port = process.env.PORT || 8000;
console.log(process.env.PRIMARY_KEY);

// Body-parser middleware
if (process.env.NODE_ENV === "production") {
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes and middlewares
app.get("/test", (req, res) => {
  console.log(`req received`);
  res.status(200).send("Everthing is working fine");
  console.log(`Test request processed`);
});

app.post("/api/analysis/text", async (req, res) => {
  try {
    console.log(`Text request`);
    const response = await analysis.sentimentAnalysis(
      req.body,
      analysis.authToken
    );
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Some error occured`);
  }
});

app.post("/api/analysis/tag", async (req, res) => {
  try {
    const response = await report.main(req.body.content);
    console.log("final report response: " + currentDate.getSeconds());
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Some error occured`);
  }
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

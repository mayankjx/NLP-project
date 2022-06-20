const axios = require("../../node_modules/axios");
const language = require("./detect-language");
require("dotenv").config();

const primaryKey = process.env.PRIMARY_KEY;
const secondaryKey = process.env.SECONDARY_KEY;
let authToken = primaryKey || secondaryKey;

const analyse = (response, report) => {
  // analyse the response regarding the returned value and create appropriate response regarding to it

  const data = response.data;

  // sentiment analysis
  if (data.sentiment_expressions) {
    data.sentiment_expressions.forEach((expression) => {
      if (expression.polarity === "negative" && report.status === "good") {
        report["status"] = "bad";
      }
      if (expression.targets) {
        expression.targets.forEach((target) => {
          report.targets.push(target);
        });
      }
    });
  }

  // abuse analysis
  if (data.abuse) {
    // report["abuse"] = [];
    data.abuse.forEach((abuse) => {
      report.types.push(abuse.type);
      if (abuse.tags) {
        abuse.tags.forEach((tag) => {
          report.tags.push(tag);
        });
      }
    });
  }

  return report;
};

const sentimentAnalysis = async (data, authToken) => {
  // Return a promise of analysed data of tweet
  // initialise report
  let requestBody = {};
  // report :
  // status :bad/good   string
  // type(s) of offenses    array
  // subject(s) of those offenses   array
  // tag(s) related to the sentiments   array

  let report = {};
  report["status"] = "good";
  report["types"] = [];
  report["targets"] = [];
  report["tags"] = [];
  // Find the language of input (async)
  // Make a requestBody
  // Make the API call (async)
  // Hydrate the report
  // Resolve promise/ Reject promise
  return new Promise((resolve, reject) => {
    language
      .detectLanguage(data, authToken)
      .then((response) => {
        // console.log(response);
        let languageCode = response;
        // make the request body which will be passed as data
        requestBody["language"] = `${languageCode}`;
        requestBody["content"] = `${data.content}`;
        requestBody["settings"] = {};

        // post the api and analyse the result
        var config = {
          method: "post",
          url: "https://api.tisane.ai/parse",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": `${authToken}`,
          },
          data: requestBody,
        };
        return axios(config);
      })
      .then((response) => {
        let reportData = analyse(response, report);
        resolve(reportData);
      })
      .catch((error) => {
        console.log(error.message);
        reject(error);
      });
  });
};

// testing module

// const getReport = async (data, authToken) => {
//   try {
//     const response = await sentimentAnalysis(data, authToken);
//     console.log(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// getReport({ content: "he should die" }, "e0ebf24d8f484c718fbb4c2d814e1131");

module.exports = {
  sentimentAnalysis,
  authToken,
};

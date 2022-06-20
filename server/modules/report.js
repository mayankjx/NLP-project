const analysis = require("./text-analysis");
const twitter = require("./twitter-api");

const getTweetData = async (tag) => {
  try {
    let tweetData = await twitter.getTweets(`${tag}`);
    return tweetData;
  } catch (error) {
    console.log(error);
  }
};

const hydrateReport = (dataSet, reportSheet) => {
  return new Promise((resolve, reject) => {
    const PromiseArray = [];

    for (const data of dataSet) {
      let promise = new Promise((resolve, reject) => {
        let reqData = { content: `${data.content}` };
        console.log("Making Request");
        console.log(reqData);

        analysis
          .sentimentAnalysis(reqData, analysis.authToken)
          .then((response) => {
            console.log("Response to each request made");
            console.log(response);
            if (reportSheet.status === "good" && response.status === "bad") {
              reportSheet.status = "bad";
            }
            response.types.forEach((type) => {
              reportSheet.types.push(type);
            });
            response.targets.forEach((target) => {
              reportSheet.targets.push(target);
            });
            response.tags.forEach((tag) => {
              reportSheet.tags.push(tag);
            });
            console.log("Reportsheet of individual response: ");
            console.log(reportSheet);
            return reportSheet;
          })
          .then((response) => {
            resolve();
          })
          .catch((err) => {
            reject(err);
            return err;
          });
      });
      PromiseArray.push(promise);
    }

    console.log("PROMISE ARRAY: ");
    console.log(PromiseArray);
    Promise.allSettled(PromiseArray)
      .then(() => {
        console.log("ALL PROMISES FULFILLED");
        console.log(reportSheet);
        return resolve(reportSheet);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

function main(tag) {
  // Returns a promise of generated report
  // initialise empty report
  let reportSheet = {};
  reportSheet["status"] = "good";
  reportSheet["types"] = [];
  reportSheet["targets"] = [];
  reportSheet["tags"] = [];

  // get the dataset of all the tweets regarding the passed parameter (async)
  // analyse each tweet in the dataset and update the report (asycn)
  // if all went right resolve the promise or reject with error message
  return new Promise((resolve, reject) => {
    getTweetData(tag)
      .then((dataSet) => {
        console.log("DATASET: ");
        console.log(dataSet);
        return hydrateReport(dataSet, reportSheet);
      })
      .then((reportSheet) => {
        console.log("FINAL REPORT: ");
        resolve(reportSheet);
      })
      .catch((error) => {
        console.log(error.message);
        reject(error);
      });
  });
}

// testing module

// const getReport = async (tag) => {
//   try {
//     const response = await main(tag);
//     console.log("Final response");
//     console.log(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// getReport("pakistan");

module.exports = {
  main,
};

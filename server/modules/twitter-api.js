const Twitter = require("../../node_modules/twitter");

let client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

function main() {
  // return promise
  // make API call (async)
  // resolve promise
}

const getTweets = (topic) => {
  console.log("getting tweets");
  return new Promise((resolve, reject) => {
    const hashtag = "#" + `${topic}`;
    const tweetData = [];
    client.get(
      "search/tweets",
      { q: hashtag, count: 1, tweet_mode: "extended" },
      (error, tweets, response) => {
        if (error) {
          reject(error);
        } else {
          tweets.statuses.forEach(function (tweet) {
            let tweetObj = {};
            tweetObj["id"] = tweet.id;
            tweetObj["content"] = tweet.full_text;
            tweetData.push(tweetObj);
          });
          resolve(tweetData);
        }
      }
    );
  });

  // make a structured response relative to it
};

module.exports = {
  getTweets,
};

const Twit = require("twit");
const dotenv = require("dotenv").config();
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

T.get("search/tweets", { q: "bjp since:2018-07-1", count: 100 }, function(
  err,
  data
) {
  if (!err) {
    let score = 0;
    let max = 0,
      min = 9999;
    let mpTweet, mnTweet;
    data.statuses.forEach(element => {
      let s = sentiment.analyze(element.text).score;
      if (s > max) {
        max = s;
        mpTweet = element.text;
      } else if (s < min) {
        min = s;
        mnTweet = element.text;
      }
      score += s;
    });
    console.log("bjp Score : " + score);
    console.log("Most Positive: " + mpTweet);
    console.log("Most Negative: " + mnTweet);
  } else {
    console.log(err);
  }
});

T.get("search/tweets", { q: "congress since:2018-07-1", count: 100 }, function(
  err,
  data
) {
  if (!err) {
    let score = 0;
    let max = 0,
      min = 9999;
    let mpTweet, mnTweet;
    data.statuses.forEach(element => {
      let s = sentiment.analyze(element.text).score;
      if (s > max) {
        max = s;
        mpTweet = element.text;
      } else if (s < min) {
        min = s;
        mnTweet = element.text;
      }
      score += s;
    });
    console.log("congress Score : " + score);
    console.log("Most Positive: " + mpTweet);
    console.log("Most Negative: " + mnTweet);
  } else {
    console.log(err);
  }
});

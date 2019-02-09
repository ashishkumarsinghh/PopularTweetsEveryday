const Twit = require("twit");
const dotenv = require("dotenv").config();
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const express = require("express");

const app = express();
console.log("before static.");
app.use(express.static(path.resolve(__dirname, "./client/build")));
console.log("thats me !00");
app.listen(process.env.PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running on " + process.env.PORT);
  }
});

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.get("/compare", function(req, res) {
  if (req.query.p1 === undefined || req.query.p2 === undefined) {
    res.send("bad bad bad !");
  }
  let result = [];
  let count = 0;
  T.get(
    "search/tweets",
    { q: req.query.p1 + " since:2018-07-1", count: 100 },
    function(err, data) {
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
        result.push({
          "Search Term 1": req.query.p1,
          "Total score": score,
          "Most Positive Tweet": mpTweet,
          "Most Negative Tweet": mnTweet
        });
        count++;
        console.log(req.query.p1 + " Score : " + score);
        console.log("Most Positive: " + mpTweet);
        console.log("Most Negative: " + mnTweet);
        if (count >= 2) {
          res.send({ result: result });
        }
      } else {
        console.log(err);
      }
    }
  );

  T.get(
    "search/tweets",
    { q: req.query.p2 + " since:2018-07-1", count: 100 },
    function(err, data) {
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
        console.log(req.query.p2 + " Score : " + score);
        console.log("Most Positive: " + mpTweet);
        console.log("Most Negative: " + mnTweet);
        result.push({
          "Search Term 1": req.query.p2,
          "Total score": score,
          "Most Positive Tweet": mpTweet,
          "Most Negative Tweet": mnTweet
        });
        count++;
        if (count >= 2) {
          res.send({ result: result });
        }
      } else {
        console.log(err);
      }
    }
  );
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

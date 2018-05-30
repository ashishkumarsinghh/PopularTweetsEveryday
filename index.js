const express = require("express")
const Twit = require("twit")


const app = express()
const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})
let count = 0;
app.get("/", function(req, res){
  res.send("Total tweets :"+count)
})

let trackList = []

trackList.push("mongodb")
trackList.push("es6")
trackList.push("javascript")

const stream = T.stream('statuses/filter', { track: trackList })
stream.on("tweet", function(tweet){
  count++;
  //console.log(tweet.text)
})

app.listen(3000, ()=> console.log("server running on 3000."));

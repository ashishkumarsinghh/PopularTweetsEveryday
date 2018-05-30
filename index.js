const express = require("express")
const Twit = require("twit")
const sgMail = require('@sendgrid/mail');


const app = express()

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})


let count = 0;

app.get("/", function(req, res){
  res.send("A simple twitter bot by Ashish Kumar Singh.")
})

// 
// app.get("/mail", function(req, res){
//   sendMail();
//   res.send("Mail is sent. Please check.");
// })


app.get("/tracklist", function(req, res){
  let result = "";
  for(let i=0;i<trackList.length;i++){
    result+=trackList[i]+"  ";
  }
  res.send(result);
})

app.get("/count", function(req, res){
  res.send("Total tweets :"+count)
})

let trackList = []

trackList.push("mongodb")
trackList.push("es6")
trackList.push("javascript")

let stream = T.stream('statuses/filter', { track: trackList })
stream.on("tweet", function(tweet){
  count++;
  //console.log(tweet.text)
})

function sendMail(){
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'warrior2602@gmail.com',
  from: 'ashwebdeveloper@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
}


function addToTrackList(item){
  trackList.push(item);
  stream = T.stream('statuses/filter', { track: trackList })
  stream.on("tweet", function(tweet){
    count++;
    //console.log(tweet.text)
  })
}


app.listen(process.env.PORT, ()=> console.log("server running on."+process.env.PORT));

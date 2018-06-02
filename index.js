const express = require("express")
const Twit = require("twit")
const sgMail = require('@sendgrid/mail')
const fs = require("fs")

const app = express()

const T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})


app.get("/", function(req, res) {

    res.send("Server is running.");
})


let message = {};
message.text = "";

let getTweets = function() {
    T.get("lists/statuses", { owner_screen_name: "ks_ashi", slug: "javascript", include_rts: false },
        function(error, tweet) {
            tweet.forEach(element => {
                if (element.favorite_count + element.retweet_count >= 5) {

                    message.text += element.text + "\n\n";
                }
            });
        });
    message.to = "warrior2602@gmail.com";
    message.from = "ashwebdeveloper@gmail.com";
    message.subject = "Today's popular Tweets" + " " + new Date();
    try {
        sendMail(message);
    } catch (error) {
        console.log(error);
    }

};

setInterval(getTweets, 10 * 60 * 60 * 1000);


function sendMail(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    /*const msg = {
        to: 'warrior2602@gmail.com',
        from: 'ashwebdeveloper@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };*/
    sgMail.send(msg).catch(function(err) {
        console.log(err);
    });
}


function reset() {
    fs.writeFile("PopTweets.txt", "", function(err) {
        if (err)
            console.log(err);
    });
}


app.listen(process.env.PORT, () => {
    console.log("server running on." + process.env.PORT);
    reset();
});
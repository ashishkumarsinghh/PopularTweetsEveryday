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
    fs.readFile("PopTweets.txt", function(err, buf) {
        if (err)
            res.send(err)
        else
            res.send(buf.toString());
    })
})

// 
// app.get("/mail", function(req, res){
//   sendMail();
//   res.send("Mail is sent. Please check.");
// })


T.get("lists/statuses", { owner_screen_name: "ks_ashi", slug: "javascript" }, function(error, data) {
    //console.log(data)
    if (data.text)
        fs.appendFile("PopTweets.txt", data.text, function(err, content) {
            if (err)
                console.log(err)
            else {
                //console.log(content);
            }
        });
});


function sendMail() {
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


function reset() {
    fs.writeFile("PopTweets.txt", "", function(err, data) {
        if (err)
            console.log(err);
    });
}


app.listen(process.env.PORT, () => console.log("server running on." + process.env.PORT));
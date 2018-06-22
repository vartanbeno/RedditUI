var express = require("express");
var app = express();
var snoowrap = require("snoowrap");

var port = process.env.PORT || 3000;

const reddit = new snoowrap({
    userAgent: "myReddit",
    clientId: "{YOUR_CLI_ID}",
    clientSecret: "{YOUR_CLI_SECRET}",
    username: "{YOUR_USERNAME}",
    password: "{YOUR_PASSWORD}"
});

app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    console.log("test");
})

app.get("/hot/:subreddit", function(req, res) {
    let hotPosts = reddit.getSubreddit(req.params.subreddit).getHot({limit: 10})
    hotPosts.then(hot => {
            hot.forEach((post, index, posts) => {
                if (post.stickied) {
                    posts[index].title = "[STICKIED] - " + post.title;
                }
            })
        })
        .then(() => {
            res.render("index", {hotPosts: hotPosts});
        })
})

app.get("/top/:subreddit", function(req, res) {
    let hotPosts = reddit.getSubreddit(req.params.subreddit).getTop({limit: 10, time: "all"})
    hotPosts.then(() => {
            res.render("index", {hotPosts: hotPosts});
        })
})

app.listen(port);
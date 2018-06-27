var express = require("express");
var app = express();
var snoowrap = require("snoowrap");
var bodyParser = require("body-parser")

var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    res.render("index", {qs: req.query});
})

// app.post("/", urlencodedParser, function(req, res) {
//     console.log(req.body);
//     res.render("search-success", {data: req.body})
// })

app.post("/", urlencodedParser, function(req, res) {
    console.log(req.body);
    let posts = reddit.getSubreddit(req.body.subreddit).getTop({limit: 10, time: req.body.time});
    posts.then(() => {
        res.render("posts", {data: req.body, redditPosts: posts})
    })
})

app.get("/hot/:subreddit", function(req, res) {
    let hotPosts = reddit.getSubreddit(req.params.subreddit).getHot({limit: 10});
    hotPosts.then(hot => {
            hot.forEach((post, index, posts) => {
                if (post.stickied) {
                    posts[index].title = "[STICKIED] - " + post.title;
                }
            })
        })
        .then(() => {
            res.render("posts", {redditPosts: hotPosts});
        })
})

app.get("/top/:subreddit/:time?", function(req, res) {
    let time = req.params.time || "all";
    let topPosts = reddit.getSubreddit(req.params.subreddit).getTop({limit: 10, time: time});
    topPosts.then(() => {
            res.render("posts", {redditPosts: topPosts});
        })
})

app.listen(port);
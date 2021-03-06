var express = require("express");
var app = express();
var snoowrap = require("snoowrap");
var bodyParser = require("body-parser");

const sortOptions = ['hot', 'new', 'rising', 'controversial', 'top']
const timespan = ['all', 'year', 'month', 'week', 'day', 'hour'];
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
    res.render("index", {qs: req.query, sortOptions: sortOptions, timespan: timespan});
})

app.get("/results", function(req, res) {
    let posts;
	req.query.subreddit = req.query.subreddit.replace(/\s/g, "");
	req.query.subreddit = req.query.subreddit.replace(/,/g, "+");
    if (req.query.sort == "hot") {
        posts = reddit.getSubreddit(req.query.subreddit).getHot({limit: parseInt(req.query.number)});
        if (req.query.sticky == "yes") {
            posts.then(hot => {
                hot.forEach(post => {
                    if (post.stickied) {
                        post.title = "[STICKIED] - " + post.title;
                    }
                })
            })
        }
        else {
            posts = posts.filter(post => !post.stickied)
        }
    }
    else if (req.query.sort == "new") {
        posts = reddit.getSubreddit(req.query.subreddit).getNew({limit: parseInt(req.query.number)});
    }
    else if (req.query.sort == "rising") {
        posts = reddit.getSubreddit(req.query.subreddit).getRising({limit: parseInt(req.query.number)});
    }
    else if (req.query.sort == "controversial") {
        posts = reddit.getSubreddit(req.query.subreddit).getControversial({limit: parseInt(req.query.number)});
    }
    else if (req.query.sort == "top") {
        posts = reddit.getSubreddit(req.query.subreddit).getTop({limit: parseInt(req.query.number), time: req.query.time});
    }
	
	if (req.query.subreddit == "all" || req.query.subreddit.split("+").length > 1) {
		posts.then(hot => {
			hot.forEach(post => {
				post.title = "/r/" + post.subreddit.display_name + " - " + post.title;
			})
		})
	}
    
    posts.then(() => {
        res.render("posts", {qs: req.query, redditPosts: posts})
    })
})

app.listen(port);
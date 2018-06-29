angular.module("TestApp", []);

angular.module("TestApp").controller("MainController", mainFunc);
angular.module("TestApp").controller("PostController", postFunc);

function mainFunc() {
    this.sortOptions = sortOptions;
    this.timespan = timespan;
}

function postFunc() {
    this.redditPosts = redditPosts;
}
# Reddit UI

This is a simple Reddit user interface. It is built with NodeJS and [snoowrap](https://github.com/not-an-aardvark/snoowrap), a JavaScript wrapper for the Reddit API.

### Installation

This Reddit UI requires [Node.js](https://nodejs.org/) v4+ to run.
Clone the repository and make sure to install the required dependencies.

```sh
$ git clone https://github.com/vartanbeno/RedditUI.git
$ npm install --save
$ node app.js
```

### Usage

First, make/log into your Reddit account and get your client ID and client secret. To do so:

1. Go in preferences.
2. Click on the "apps" tab.
3. Click on the "create another app..." button.
4. Choose script, fill out the form however you would like.
5. Click on the "create app" button.
6. Your client secret is next to the "secret" field, and your client ID is the string of characters under the name of your app.
7. Using this information, go in the app.js file and replace the needed values in the *reddit* constant.

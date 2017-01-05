# README #

This README documents steps are necessary to get your application up and running.

### What is this repository for? ###

* Topinsight
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

###### Global Set up ######
* Install [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12).
> Once Xcode is installed, several command-line tools need to be enabled for Cordova to run.
> * `xcode-select --install`
> * `npm install -g ios-deploy` - Under OS X 10.11 El Capitan add `--unsafe-perm=true --allow-root`
* Install the [Android Stand-alone SDK Tools](http://developer.android.com/sdk/installing/index.html?pkg=tools) or [Android Studio](http://developer.android.com/sdk/installing/index.html?pkg=studio)
* [Node.js](https://nodejs.org/en/download/), version used v6.9.1
> Upgrade Node.js
> * `sudo npm install n -g` - Node version manager
> * `sudo n stable` - For the latest stable version
* npm, version used 3.10.8 (Node comes with npm installed). npm is upgrading with Node.js
* Cordova version used 6.4.0
* `chmod -R 775 folder/` to change permission

* `sudo npm install -g cordova`
* `sudo npm install`
* `npm run prepare`

###### Launch ######

* Modify sources in work/
* `npm run dev` - Launch a web-server to see the application in browser
> Cordova version 6.4.0 display this error `Error loading cordova-browser`, this is a misleading message error.

* `npm run build` - Build css & js for development, also copy non-minified js for debugging

###### Configuration ######

* To see which modules are outdated: `npm outdated`

* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review - No Lint errors allowed
* Other guidelines

### Who do I talk to? ###

For any information, contact matthieu.comperat@gmail.com

### Version ###
* v1.0 - January 2017
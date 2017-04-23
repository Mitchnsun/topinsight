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
* `npm run dev` - Launch a web-server to see the application in browser. Should be shut down to debug on devices.
> Cordova version 6.4.0 display this error `Error loading cordova-browser`, this is a misleading message error.

* `npm run build:www` - Build css & js for development, also copy non-minified js for debugging
* `npm run prepare:apps` - Build css & js and update the platforms

###### Deploy ######

* `npm run build:apps` - Build css & js for development, also copy non-minified js for debugging
> CLI archive ios failed if you have not the distribution certificat

###### Hooks ######

* For Android icons & splashscreens, you have to copy the res/ folder in platforms/android/

###### Others ######

* To see which modules are outdated: `npm outdated`
* Code review - No Lint errors allowed

### White Brand ###

* Colors : in files work/less/variables.less -> @brandcolor
> Default colors : @white: #FFF; @black: #202020; @brandcolor: #00BFA5; @grey: #9B9B9B; @facebook: #3b5998; @twitter: #55acee;
* Images : in work/assets and work/assets/img
> Icons in the brand color : chevron-left.png, chevron-right.png, compteur.png, logo.png, splashscreen.png, icon-arrow.png, icon-location.png, icon-signout.png
* App icons in folder work/assets/app-icons, each files should be changed.
* After this changes, launch `npm run clean` - clean ios & android platform and build the project

### Who do I talk to? ###

For any information, contact matthieu.comperat@gmail.com

### Version ###
* v1.0 - January 2017
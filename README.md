# Welcome to Team Toolbox!
A web app that helps you to:
 - build teams randomly
 - choose randomly members from a Team
 - define passing order
 - find pairs (e.g matches of 2 people)

This webapp can be used without any web servers (at least with firefox web browser) but you will not be able to use remote storage (Oauth constraints)

**This webapp source code is not meant to be good programming practice. I made it just for fun.**

## what's inside
 - MVC library: `spapp.js` borrowed and turned into native js from ( https://github.com/c-smile/spapp )
 - Templating:`doT` templating engine (https://github.com/olado/doT)
 - Persistence and data sync: `remoteStorage` (https://remotestorage.io/) 
 - Test framework: `nightwatch`  (http://nightwatchjs.org/)

## install
 - open index.html in your favorite browser

## development
  TTB does not need anything more than an editor to work.
  But it use nodejs, grunt(`npm install -g grunt`) for tests execution and for publishing minification

  ```
  npm install #will install dev dependencies
  ```
  see `grunt help` for available tasks

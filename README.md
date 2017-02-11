#Welcome to Team Toolbox!
A web app that helps you to:
 - build teams randomly
 - choose randomly members from a Team
 - define passing order
 - find pairs (e.g matches of 2 people)

This webapp can be used without any web servers (at least with firefox web browser) but you will not be able to use remote storage (Oauth constraints)

##what's inside
 - `spapp` MVC library borrowed and turned into native js from ( https://github.com/c-smile/spapp )
 - `doT` templating engine (https://github.com/olado/doT)
 - `remoteStorage` (https://remotestorage.io/) for datas syncing between devices
 - `nightwatch` as a test framework (http://nightwatchjs.org/)

##install
 - open index.html in your favorite browser

##development
  TTB does not need anything more than an editor to work.
  But it use nodejs, grunt for tests execution and for publishing preparation
  - nodejs
  - grunt: `npm install -g grunt`

  ```
  npm install #will install dev dependencies
  ```
  see `grunt help` for available tasks 





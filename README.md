#Team Tool Box, a sample standalone offline js app
It helps you to:
 - build teams randomly
 - choose randomly members from a Team

TTB can be used without any web servers but will not be able to use remotestorage

##what's inside
 - `spapp` MVC library borrowed and turned into native js from ( https://github.com/c-smile/spapp )
 - `doT` templating engine (https://github.com/olado/doT)
 - `remoteStorage` (https://remotestorage.io/)
 - `nightwatch` as test framework (http://nightwatchjs.org/)

##usage
 - open index.html in your favorite browser

##development
  - need nodejs
  - grunt: `npm install -g grunt`
  ```
  npm install
  ```


###compressing for publishing
```
grunt # will output app in dist/dev folder
grunt --rev=prod #will output in dist folder
```
###tests
need chrome installed for instance
```
grunt test

```

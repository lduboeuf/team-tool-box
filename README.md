#Team Tool Box, a sample standalone offline js app
It helps you to:
 - build teams randomly
 - choose randomly members from a Team

TTB can be used without any web servers.

##what's inside
 - use tiny MVC library borrowed and turned into native js from ( https://github.com/c-smile/spapp )
 - use tiny templating engine (https://github.com/olado/doT)
 - use of `localStorage`
 - use of nightwatch as test framework

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

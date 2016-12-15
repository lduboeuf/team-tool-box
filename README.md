#Team Tool Box, a sample standalone offline js app
It helps you to:
 - build teams randomly
 - choose randomly members from a Team


##what is inside
 - use tiny MVC library borrowed and turned into native js from ( https://github.com/c-smile/spapp )
 - use tiny templating engine (https://github.com/olado/doT)
 - use of `localStorage`

##usage
 - open index.html in your favorite browser

##compressing for production
  - need nodejs, grunt `npm install -g grunt`
```
npm install
grunt # will output app in dist/dev folder
grunt --rev=prod #will output in dist folder
```

 work in progress...

/**
* @author Andrew Fedoniouk <andrew@terrainformatica.com>
* @name jQuery Single Page Application micro framework
* @license MIT
* @purpose routing and dynamic content on single page web applications
* @modifiedby Lionel Duboeuf - turned native
*/
//custom event IE polyfill
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   };

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

(function(window){

  var pageHandlers = {};

  var currentPageName = null;
  var oldPageName = null;
  var $currentPage = null;
  //equivalent of "is" jquery function
  var matches = function(el, selector) {
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
  };



  function show(pageName,param, modal) {
    var $page = document.querySelector("section#" + pageName);
    if( $page.length == 0 ) {
      console.warn("section with id=%s not found!",pageName);
      return;
    }
    var ph = pageHandlers[pageName];
    if( ph ) {
      var that = $page.length > 0 ? $page[0] : null;
      var r = ph.call(that , param);
      if( typeof r == "function" ) { // it returns the function that's used for view rendering
        if (!matches($page, '[no-ctl-cache]'))
        //if(!$page.is("[no-ctl-cache]"))
            pageHandlers[pageName] = r;
        r.call(that, param); // call that rendering function
      }
    }
    if(currentPageName) { // "close" current page view
      //
      if (modal!==true){
        document.body.classList.remove(currentPageName); // remove old page class
        $currentPage.classList.remove('modal');
      }
      if($currentPage) {

        document.dispatchEvent(new CustomEvent('page.hidden',{'currentPage' : currentPageName }));
        //$currentPage.trigger("page.hidden",currentPageName);
        if($currentPage.getAttribute('src') && matches($currentPage, '[no-ctl-cache]'))
            $currentPage.innerHTML = null;
            //$currentPage.empty();
      }
    }
    oldPageName = currentPageName;
    document.body.classList.add(currentPageName = pageName); // set new page class
    if (modal===true){
      $page.classList.add('modal');
    }


    if($currentPage = $page){

      document.dispatchEvent(new CustomEvent('page.shown', {'currentPage' : currentPageName}));
      //update url location if not
      if ($page.getAttribute('default')!=""){
        var url = '#' + currentPageName;
        if (param && typeof(param)!=='object') //don't display object in url
          url += ':' + param;

        if (location.hash=="" || location.hash!==url){
          history.pushState(null, null, url);
        }
      }
    }
  }

  function app(pageName,param, modal) {

    var $page = document.body.querySelector("section#" + pageName);
    if(!$page){
      console.error('page' + pageName + ' is not declared has a section');
    }
    var src = $page.getAttribute("src");
    if( src && !$page.hasChildNodes()) { // it has src and is empty
      app.get(src, $page, pageName, param,modal);
      // app.get(src, $page, pageName)
      //     .done(function(html){$page.html(html); show(pageName,param); })
      //     .fail(function(){ console.warn("failed to get %s page!",pageName);});
    } else
      show(pageName,param,modal);
  }

  app.back = function(params){
    app(oldPageName, params);
  }
  // Registration of page's handler function - scope initializer and controller
  app.page = function(pageName, handler) {
     pageHandlers[pageName] = handler;
    };

  // Function to get page's html, shall return jQuery's promise. Can be overriden.
  app.get = function(src,$page,pageName, param, modal) {
    //return $.get(src, "html");
    var request = new XMLHttpRequest();
    request.open('GET', src, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        $page.innerHTML = request.responseText;
        show(pageName,param, modal);
      } else {
        // We reached our target server, but it returned an error
        console.warn("failed to get %s page!",pageName);
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.warn("failed to get %s page!",pageName);
    };

    request.send();
  };

  function onhashchange()
  {
    var hash = location.hash || ("#" + document.querySelector('section[default]').getAttribute('id'));

    var re = /#([-0-9A-Za-z]+)(\:(.+))?/;
    var match = re.exec(hash);
    hash = match[1];
    var param = match[3];
    app(hash,param);
  }

  window.addEventListener('hashchange', onhashchange);
  //$(window).on("hashchange", onhashchange );

  window.app = app;

  // Call onhashchange manually for the initialization.
  // setTimeout is used to postpone initialization so application can configure window.app.get = function(src,$page,pageName); for example
  //don't work everytime
  // window.setTimeout( function() {
  //   window.dispatchEvent(new CustomEvent('hashchange'));
  //   //$(onhashchange);
  // });

})(this);

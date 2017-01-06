//alert msg handler
app.alert = function(type, message){
  var className='.'+type;
  var alertBox = document.querySelector(className);
  var alertMsg = alertBox.querySelector('.alert-msg');
  alertMsg.innerHTML = message;
  alertBox.style.display = 'block';
}

app.start = function(){



  //remotestorage
  remoteStorage.access.claim('teams', 'rw');
  remoteStorage.access.claim('archives', 'rw');
  remoteStorage.access.claim('config', 'rw');


  remoteStorage.displayWidget();


  //simulate a hash change at startup
  window.dispatchEvent(new CustomEvent('hashchange'));

}

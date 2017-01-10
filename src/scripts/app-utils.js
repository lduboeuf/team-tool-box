//alert msg handler
app.alert = function(type, message){
  var className='.'+type;
  var alertBox = document.querySelector(className);
  var alertMsg = alertBox.querySelector('.alert-msg');
  alertMsg.innerHTML = message;
  alertBox.style.display = 'block';
  window.addEventListener('click', app.cleanUI);
}

app.cleanUI = function(evt){
  //toggle menu when a menu item is clicked
  if (evt.target.parentNode.className!=='icon'){
    document.getElementById("menu").className = "topnav";
    window.removeEventListener('click', app.cleanUI);
  }
  //make sure every alert box is hidden
  document.querySelector('.alert').style.display = 'none';
}

app.start = function(){

  //menu handler
  var $menu = document.getElementById("menu");
  var $menu_icon = $menu.querySelector('.icon > a');
  //menu for mobile click handler
  function toggleMenu() {
      if ($menu.className === "topnav") {
          $menu.className += " responsive";
          //handle click outside menu to toggle it
          window.addEventListener('click', app.cleanUI);
      } else {
          $menu.className = "topnav";
      }
  }


  $menu_icon.onclick = toggleMenu;

  //remotestorage
  remoteStorage.access.claim('teams', 'rw');
  remoteStorage.access.claim('archives', 'rw');
  remoteStorage.access.claim('config', 'rw');


  remoteStorage.displayWidget();


  //simulate a hash change at startup
  window.dispatchEvent(new CustomEvent('hashchange'));

}

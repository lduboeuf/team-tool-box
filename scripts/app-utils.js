//alert msg handler
app.alert = function(type, message){
  var className='.'+type;
  var alertBox = document.querySelector(className);
  var alertMsg = alertBox.querySelector('.alert-msg');
  alertMsg.innerHTML = message;
  alertBox.style.display = 'block';
}

app.start = function(){

  var menu = document.getElementById("menu");
  var links = document.querySelectorAll('header ul li a');
  //menu for mobile click handler
  function menuHandler() {
      if (menu.className === "topnav") {
          menu.className += " responsive";
      } else {
          menu.className = "topnav";
      }
  }

  function setSelected(){
    //toggle menu when a menu item is clicked
    if (this.parentNode.className!=='icon'){
      menu.className = "topnav";
    }

    //make sure every alert box is hidden
    document.querySelector('.alert-info').style.display = 'none';

  }

  for(i=0;i<links.length;i++) {
    links[i].addEventListener('click',setSelected);
  }
  document.querySelector('div.brand a').onclick = setSelected;

  //when clicking outside of menu, toggle menu
  document.querySelector('body>section').onclick = function(){
    menu.className = "topnav";
  }

  //remotestorage
  remoteStorage.access.claim('teams', 'rw');
  remoteStorage.access.claim('archives', 'rw');

  remoteStorage.displayWidget();
  //simulate a hash change at startup
  window.dispatchEvent(new CustomEvent('hashchange'));

}

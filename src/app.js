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

//breadcrump navigation management
app.navigation = {
  $navTitle : document.querySelector('#navigation h1'),
  $navLink : document.querySelector('#navigation a'),
  set: function(title){
    var title = title || 'Home';
    var icon = (title==='Home') ? '&#8962;': '&#8592;';

    this.$navTitle.innerHTML = title;
    this.$navLink.innerHTML = icon;
  },

  add: function(title){
    this.$navTitle.innerHTML = this.$navTitle.innerHTML + ' : ' + title;
  }


}


app.init = function(event) {
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

  remoteStorage = new RemoteStorage({
    changeEvents: { local: true, window: true, remote: true, conflicts: true },
    modules: [TTBArchives, TTBConfig, TTBTeams]
  })


  remoteStorage.access.claim('teams', 'rw');
  remoteStorage.access.claim('archives', 'rw');
  remoteStorage.access.claim('config', 'rw');

  remoteStorage.on('ready', function() {
    //more optimized than findAll ?-> getListing
    remoteStorage.teams.findAll().then(
      function(teams){

        if (Object.keys(teams).length === 0){
          app.alert('alert-info','<strong>hello ;-)</strong>. Welcome to <strong>Team Toolbox!</strong>. Maybe your first time here, please have a look to the <a href="#about">About</a> section. For those who may not retrieve your datas, be sure to be synced with remoteStorage or see <a href="#settings">settings</a> to upgrade');
        }
      }
    );

  });

  var widget = new Widget(remoteStorage);
  widget.attach();



  //subscribe to page.shown event
  document.addEventListener('page.shown', function(e){
    app.navigation.set(e.detail.title);
  });

  //simulate a hash change at startup
  window.dispatchEvent(new CustomEvent('hashchange'));
}

document.addEventListener("DOMContentLoaded",app.init);

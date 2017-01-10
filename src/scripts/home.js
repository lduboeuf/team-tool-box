app.page("home", function()
{

  return function(params) {

    remoteStorage.teams.findAll().then(
      function(teams){

        if (Object.keys(teams).length === 0){
          app.alert('alert-info','<strong>hello ;-)</strong>. Welcome to <strong>Team Tool Box!</strong>. Maybe your first time here, please have a look to the <a href="#about">About</a> section');
        }
      }
    );

  }
});

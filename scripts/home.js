app.page("home", function()
{

  return function(params) {

    remoteStorage.teams.findAll().then(
      function(teams){

        if (Object.keys(teams).length === 0){
          app.alert('alert-info','hello ;-). Welcome to Team Tool Box!. Maybe the first time here, please have a look to the <a href="#about">About</a> section');
        }
      }
    );

  }
});

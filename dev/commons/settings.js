app.page("settings", function()
{
  var $settings = document.getElementById('settings');
  var $teamNames = $settings.querySelector('input[name="team_names"]');
  var $update_conf = $settings.querySelector('input[name="submit"]');
  var $btnUpgrade = $settings.querySelector('button[name="upgrade"]');

  var currentconf = null;
  //var tplTeamList = $teamList.innerHTML;
  $update_conf.onclick = function(e){
    e.preventDefault();
    var new_team_names =   $teamNames.value.split(",");
    if (new_team_names.length > 0){
      currentconf.team_names = new_team_names;
      remoteStorage.config.set(currentconf);
      alert('cool, config stored');
    }

  }

  $btnUpgrade.onclick = function(e){
      e.stopPropagation();
      remoteStorage.teams.upgrade().then(function(success){
        if (!success){
          app.alert('alert-info','nothing to do for teams');
          return;
        }
      });
      remoteStorage.archives.upgrade().then(function(success){
        if (success){
          app.alert('alert-info','ok, upgrade done, just need to reload the app now: <a href="">click here</a> ');
        }else{
          app.alert('alert-info','nothing to do');
        }
      });


  }


  return function(params) {

    //var teams = TeamRepository.findAll();
    remoteStorage.config.get().then(
      function(config){
        currentconf = config;
        $teamNames.value = config.team_names;

      }
    );

  }
});

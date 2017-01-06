app.page("settings", function()
{

  var $teamNames = document.querySelector('#settings input[name="team_names"]');
  var $update_conf = document.querySelector('#settings input[name="submit"]');
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

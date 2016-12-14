
  app.page("team-list", function()
  {

    var $teamList = document.querySelector('#team-list ul');
    //var tplTeamList = $teamList.innerHTML;
    var tpl = doT.template($teamList.innerHTML);

    $teamList.innerHTML=null;


    return function(params) {

      //var teams = TeamRepository.findAll();
      remoteStorage.teams.findAll().then(
        function(teams){
          $teamList.innerHTML = tpl(teams);
        }
      );
      /*
      var output = mustache(tplTeamList, { teams: teams} );
      $teamList.innerHTML = output;
*/
    }
  });

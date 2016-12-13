
  app.page("team-list", function()
  {

    var $teamList = document.querySelector('#team-list ul');
    var tplTeamList = $teamList.innerHTML;

    $teamList.innerHTML=null;


    return function(params) {

      var teams = TeamRepository.findAll();
      var output = mustache(tplTeamList, { teams: teams} );
      $teamList.innerHTML = output;
      // var peoples = TeamRepository.findAll();
      //
      // var output = mustache(tpl, { list: peoples} );
      // olist.innerHTML = output;
    }
  });

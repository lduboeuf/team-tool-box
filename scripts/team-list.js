
  app.page("team-list", function()
  {

    var ulTeamList = document.querySelector('#team-list ul');

    var tplTeamList = ulTeamList.innerHTML;

    ulTeamList.innerHTML=null;


    return function(params) {

      var teams = TeamRepository.findAll();
      var output = mustache(tplTeamList, { teams: teams} );
      ulTeamList.innerHTML = output;
      // var peoples = TeamRepository.findAll();
      //
      // var output = mustache(tpl, { list: peoples} );
      // olist.innerHTML = output;
    }
  });


  app.page("team-list", function()
  {

    var $teamList = document.querySelector('#team-list ul');
    //var tplTeamList = $teamList.innerHTML;
    var tpl = doT.template($teamList.innerHTML);

    $teamList.innerHTML=null;


    return function(params) {

      var teams = TeamRepository.findAll();
      $teamList.innerHTML = tpl(teams);
      console.log('hellow');
    }
  });

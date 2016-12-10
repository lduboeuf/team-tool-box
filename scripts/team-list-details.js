
  app.page("team-list-details", function()
  {

    var o = document.getElementById('team-list-details');
    var tpl= o.innerHTML;

    //default is not shown
    o.innerHTML=null;


    return function(params) {
      var teamId = parseInt(params);
      var team = TeamRepository.findById(teamId);
      var output = mustache(tpl,  team );
      o.innerHTML = output;

    }
  });

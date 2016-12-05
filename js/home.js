app.page("home", function()
{

  var olist = document.getElementById('teams-result');
  var oSelect = document.getElementById("nb");
  var tpl = olist.innerHTML;

  var findPeoples = function() {
        var peoples = TeamRepository.findAll();

        //define an array of indices
        var idxs = peoples.map(function (x, i) { return i });

        var nbPers = oSelect.value;
        //to avoid infinite loop
        if (nbPers.length === 0) return;

        var members = [nbPers];
        var idx, n;
        var nb = Math.min(nbPers, peoples.length);
        var team = { name : "Hall of fame:"};
        for (var i=0; i < nb;i++){
           //n = Math.floor(Math.random() * (idxs.length - 1));
           n = Math.floor(Math.random() * idxs.length);
           idx = idxs.splice(n, 1);
           members[i] = peoples[idx];

        }
        team.members = members;
        displayTeams([team], "Hall of fame:");


      }

  var generateTeams = function() {
      var peoples = TeamRepository.findAll();

      //define an array of indices
      var idxs = peoples.map(function (x, i) { return i });


      var nbPers = oSelect.value;
      //to avoid infinite loop
      if (nbPers.length === 0) return;

      var nbTeam = Math.floor(peoples.length / nbPers);
      console.log("nbPers:" + nbPers + " - nbTeam:" + nbTeam);

      var idx, n;
      var teams = [nbTeam];
      for (var i = 0; i < nbTeam; i++) {
        var team = { name : 'Team ' + i + ':'};
        var members = [nbPers];
        for (var j = 0; j < nbPers; j++) {
          n = Math.floor(Math.random() * idxs.length);
          //n = Math.floor(Math.random() * (idxs.length - 1));
          idx = idxs.splice(n, 1);
          members[j] = peoples[idx];
        }
        team.members = members;
        teams[i] = team;

      }



      //any orphans ?
      if (idxs.length>0) {
          //add them to first team and so on
          var members = idxs.map(function (x, i) { return peoples[x] });
          var team = {
            name : 'Team Orphan(s)',
            members : members
          };
          teams.push(team);

      }

      displayTeams(teams);
    }


    var displayTeams = function(teams) {

      var output = mustache(tpl, { list: teams} );
      olist.innerHTML = output;

    }

    //empty tpl by default
    olist.innerHTML = null;


    //var gen_member = document.getElementById('gen_members');
    var gen_teams = document.getElementById('gen_teams');
    gen_teams.onclick = generateTeams;
    var gen_members = document.getElementById('gen_members');
    gen_members.onclick = findPeoples;

    oSelect.onchange = function(){
      if (gen_teams.checked){
        generateTeams();
      }else if( gen_members.checked){
        findPeoples();
      }

    }




  return function(params) {
    console.log('kikou');

  }
});

app.page("home", function()
{

  var section = document.getElementById('home');
  var oSelect = section.querySelector("#nb");
  var gen_teams = section.querySelector('#gen_teams');
  var gen_members = section.querySelector('#gen_members');
  var teamList = section.querySelector('.team-list');
  var olist = section.querySelector('#teams-result');
  var okBtn = section.querySelector('input[type="submit"]');

  //store template definition
  var tpl = olist.innerHTML;
  var tplTeamList = teamList.innerHTML;

  var currentOutput = null;


  var exec = function(){

    var teamId = parseInt(teamList.value);
    var team = null;
    //special case for all teams
    if (teamId==-1){
      team = {members: []};
      var teams = TeamRepository.findAll();
      for (var i = 0; i < teams.length;i++){
        team.members.push.apply(team.members, teams[i].members);
      }

    }else{
     team = TeamRepository.findById(teamId);
    }

    var members = team.members;
    if (members.length==0){
      return;
    }
    //define an array of indices
    var idxs = members.map(function (x, i) { return i });

    var nbPers = parseInt(oSelect.value);
    var teams = null;
    if (gen_teams.checked){
      teams = getRandomTeams(nbPers, members, idxs);

    }else{
      teams = getRandomMembers(nbPers, members, idxs);
    }
    if (teams)
      displayTeams(teams);

  }

  var getRandomMembers = function(nbPers, teamMembers, idxs) {

        var members = [nbPers];
        var idx, n;
        var nb = Math.min(nbPers, teamMembers.length);
        var team = { name : "Hall of fame:"};
        for (var i=0; i < nb;i++){
           //n = Math.floor(Math.random() * (idxs.length - 1));
           n = Math.floor(Math.random() * idxs.length);
           idx = idxs.splice(n, 1);
           members[i] = teamMembers[idx];

        }
        team.members = members;

        team.name = "Hall of fame:";
        return [team];
      }

  var getRandomTeams = function(nbPers, teamMembers, idxs) {


      var nbTeam = Math.floor(teamMembers.length / nbPers);
      console.log("nbPers:" + nbPers + " - nbTeam:" + nbTeam);

      var idx, n;
      var teams = [];
      for (var i = 0; i < nbTeam; i++) {
        var team = { name : 'Team ' + i + ':'};
        var members = [nbPers];
        for (var j = 0; j < nbPers; j++) {
          n = Math.floor(Math.random() * idxs.length);
          //n = Math.floor(Math.random() * (idxs.length - 1));
          idx = idxs.splice(n, 1);
          members[j] = teamMembers[idx];
        }
        team.members = members;
        teams[i] = team;

      }



      //any orphans ?
      if (idxs.length>0) {
          //add them to first team and so on
          var members = idxs.map(function (x, i) { return teamMembers[x] });
          var team = {
            name : 'Team Orphan(s)',
            members : members
          };
          teams.push(team);

      }

      return teams;
    }


    var displayTeams = function(teams) {
        var output = mustache(tpl, { list: teams} );
        currentOutput = teams;
        olist.innerHTML = output;
        var btnSave = olist.querySelector('button');
        btnSave.onclick = function(){
          if (currentOutput){
            app("archive-save", currentOutput);
          }
        }
    }

    //empty tpl by default
    olist.innerHTML = null;


    okBtn.onclick = function(e){
      e.preventDefault();
      exec();
    }


    //save output



  return function(params) {
    console.log('kikou');
    var teams = TeamRepository.findAll();
    if (teams.length==0){
      app.alert('alert-info','hello, no members found, you can add members by clicking on the "Team List" menu');
    //  olist.innerHTML = '''<p class="alert-info"> no members found, you can add members by clicking on the "Team List" menu</p>'
    }
    console.log(params);


    var output = mustache(tplTeamList, {teams: teams });
    teamList.innerHTML = output;

    //list already saved ?
    if (params && params.event =='onSavedOutput'){
      var btnSave = olist.querySelector('button');
      btnSave.classList.toggle('btn-default');
      btnSave.onclick = null;
    }

  }
});

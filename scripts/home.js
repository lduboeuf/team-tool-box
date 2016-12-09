app.page("home", function()
{

  var section = document.getElementById('home');
  var oSelect = section.querySelector("#nb");
  var gen_teams = section.querySelector('#gen_teams');
  var gen_members = section.querySelector('#gen_members');
  var olist = section.querySelector('#teams-result');

  //store template definition
  var tpl = olist.innerHTML;

  var currentOutput = null;


  var findPeoples = function() {
        var peoples = TeamRepository.findAll();
        if (peoples.length==0){
          return;
        }
        //define an array of indices
        var idxs = peoples.map(function (x, i) { return i });

        var nbPers = parseInt(oSelect.value);




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
      if (peoples.length==0){
        return;
      }
      //define an array of indices
      var idxs = peoples.map(function (x, i) { return i });

      var nbPers = parseInt(oSelect.value);


      var nbTeam = Math.floor(peoples.length / nbPers);
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
        currentOutput = teams;
        olist.innerHTML = output;
        // var btnSave = olist.querySelector('button');
        // btnSave.onclick = function(){
        //   if (currentOutput){
        //     app("archive-save", currentOutput);
        //   }
        // }
    }

    //empty tpl by default
    olist.innerHTML = null;

    gen_teams.onclick = generateTeams;
    gen_members.onclick = findPeoples;
    oSelect.onchange = function(){
      if (gen_teams.checked){
        generateTeams();
      }else if( gen_members.checked){
        findPeoples();
      }

    }



    //save output



  return function(params) {
    console.log('kikou');
    var members = TeamRepository.findAll();
    if (members.length==0){
      app.alert('alert-info','hello, no members found, you can add members by clicking on the "Team List" menu');
    //  olist.innerHTML = '''<p class="alert-info"> no members found, you can add members by clicking on the "Team List" menu</p>'
    }
  }
});

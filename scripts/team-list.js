
  app.page("team-list", function()
  {

    var addMemberBtn = document.getElementById('add-member-btn');
    var selectTeamList = document.querySelector('#team-list select');
    var ulMemberList = document.querySelector('#team-list ul');

    var tplTeamList = selectTeamList.innerHTML;
    var tplMemberList = ulMemberList.innerHTML;

    selectTeamList.innerHTML=null;
    ulMemberList.innerHTML=null;

    addMemberBtn.onclick = function(){
      app("team-member-add", selectTeamList.options[selectTeamList.selectedIndex].value);
    }


    return function(params) {

      var teams = TeamRepository.findAll();
      var output = mustache(tplTeamList, { teams: teams} );
      selectTeamList.innerHTML = output;
      // var peoples = TeamRepository.findAll();
      //
      // var output = mustache(tpl, { list: peoples} );
      // olist.innerHTML = output;
    }
  });

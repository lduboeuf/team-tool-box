//TODO object in memory
(function(window){

    var STORE_NAME = 'ttb';
    //localStorage.clear();
    var data = fetch() || { teams : [] };


    function store(){
        var str = JSON.stringify(data);
        localStorage.setItem(STORE_NAME, str);
    }

    function fetch(){
      var teamsStr = localStorage.getItem(STORE_NAME);
      return JSON.parse(teamsStr);
    }

    function findById(collection, id){
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].id === id) {
          return collection[i];
        }
      }
      return null;
    }

    function getLastElementId(collection, id){
      var id = 1;
      if(collection.length>0){
          var lastElement = collection[collection.length-1];
          if (typeof lastElement.id != 'undefined'){
              id = lastElement.id + 1;
          }

      }
      return id;
    }


    function TeamRepository(){
      console.log('TeamRepo called');

    }

    TeamRepository.findAll = function(){
      return data.teams;
    }

    TeamRepository.findById = function(id){
      return findById(data.teams, id);
    }




    TeamRepository.removeMember = function(teamId, memberId){
        var team = findById(teamId);
        if (!team){
          throw 'don\'t find team wih id' + teamId;
        }
        var members = team.members;
        for (var i=0; i < members.length; i++){
            if (members[i].id === id){
                members.splice(i, 1);
                break;
            }
        }

        store();
    }

    TeamRepository.addTeam = function(team){
      //add mode
      team.id = getLastElementId(data.teams);
      data.teams.push(team);
      store();
    }

    TeamRepository.addMember = function(teamId, member){
      //add mode
      var team = findById(teamId);
      if (!team){
        throw 'gloups, team does not exist';
      }

      var id = 1;
      var members = team.members;
      if(members.length>0){
          var lastElement = members[members.length-1];
          if (typeof lastElement.id != 'undefined'){
              id = lastElement.id + 1;
          }

      }
      member.id = id;
      members.push(member);


      store();
    }



    TeamRepository.updateMember = function(teamId, member){

      var team = findById(teamId);
      if (!team){
        throw 'gloups, team does not exist';
      }

      var member = findById(team.members, id);
      if (member){
        member.name = member.name;
      }
      //TODO exception

      store();
    }

    window.TeamRepository = TeamRepository;


})(this);

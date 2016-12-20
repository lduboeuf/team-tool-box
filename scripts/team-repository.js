//TODO object in memory
(function(window){

    var storage = {name: 'ttb-team', fields:['teams','members','name','id']} ;
    //localStorage.clear();
    var Teams = fetch(storage.name) || { teams : [],  };

    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 8;

    var generateUID = function() {
      var rtn = '';
      for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
      }
      return rtn;
  }


    function store(){
        var str = JSON.stringify(Teams, storage.fields);
        localStorage.setItem(storage.name, str);
    }

    function fetch(){
      var str = localStorage.getItem(storage.name);
      return JSON.parse(str);
    }


    function findById(collection, id){
      if (!collection) return null;
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].id === id) {
          return collection[i];
        }
      }
      return null;
    }



    function TeamRepository(){}

    TeamRepository.export = function(){
      return localStorage.getItem(storage.name);
    }

    TeamRepository.import =function(str){
      localStorage.setItem(storage.name, str);
      Teams = fetch(storage.name)
    }

    TeamRepository.findAll = function(){
      return Teams.teams;
    }

    TeamRepository.findById = function(id){
      return findById(Teams.teams, id);
    }

    TeamRepository.add = function(team){
      team.id = generateUID();
      team.members = [];
      Teams.teams.push(team);
      store();
    }

    TeamRepository.remove = function(teamId){
      for (var i=0; i < Teams.teams.length; i++){
        var team = Teams.teams[i];
        if (team.id === teamId){
            Teams.teams.splice(i, 1);
            break;
        }
      }

      store();
    }


    TeamRepository.findMember = function(memberId){
      for (var i=0; i < Teams.teams.length; i++){
        var member = findById(Teams.teams[i].members, memberId );
        if (member){
          return member;
        }
      }
      //not found
      return null;
    }

    TeamRepository.addMember = function(teamId, member){
      //add mode
      var team = findById(Teams.teams, teamId);
      if (!team){
        throw 'gloups, team does not exist';
      }


      var members = team.members;
      member.id = generateUID();
      members.push(member);


      store();
    }

    TeamRepository.removeMember = function(memberId){

      for (var i=0; i < Teams.teams.length; i++){
        var members = Teams.teams[i].members;
        if (members){
          for (var j=0; j < members.length; j++){
              if (members[j].id === memberId){
                  members.splice(j, 1);
                  break;
              }
          }
        }
      }

      store();
    }

    TeamRepository.save = function(){
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

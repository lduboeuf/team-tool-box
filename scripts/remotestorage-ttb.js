RemoteStorage.defineModule("teams", function (privateClient, publicClient) {
/*
  privateClient.declareType('member',{
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "name": {
        "type": "string"
    },
    "required": [ "id", "name" ]
  });*/
  privateClient.cache('', 'ALL');
  privateClient.declareType('team', {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "name": {
      "type": "string"
      },
      "members": {
        "type": "array",
        "default": [],
        "items":{
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
            "type": "string"
            }
          }
        }
      }
    },
    "required": [ "id", "name" ]
  });

  var teams = {

        store: function(team) {
          if (!team.id){
            team.id = generateUID();
            team.members = [];
          }
          var path = "team/" + team.id;
          return privateClient.storeObject("team", path, team).
            then(function() {
              return team;
            });
        },
        addMember: function(teamId, member){
          return remoteStorage.teams.find(teamId).then(
            function(team){
              member.id = generateUID();
              team.members.push(member);
              return remoteStorage.teams.store(team);
            });
        },
        findMember: function(memberId){
          return privateClient.getAll('team/').then(function(teams){
            for (var property in teams) {
              var member = findById(teams[property].members, memberId);
              if (member){
                return member;
              }
            }
            return null;
          })
        },
        updateMember: function(member){
          return privateClient.getAll('team/').then(function(teams){
            for (var property in teams) {
              var members = teams[property].members;
              for (var i=0; i < members.length; i++){
                  if (members[i].id === member.id){
                    members[i] = member;
                    return remoteStorage.teams.store(teams[property]);
                  }

              }
            }
            return null;
          })

        },
        removeMember: function(memberId){
          return privateClient.getAll('team/').then(function(teams){
            for (var property in teams) {
              var members = teams[property].members;
              for (var i=0; i < members.length; i++){
                  if (members[i].id === memberId){
                      members.splice(i, 1);
                      return remoteStorage.teams.store(teams[property]);
                  }
              }
            }
            return false;
          })
        },
        remove: function(teamId){
          return privateClient.remove('team/' + teamId);
        },
        find: function(id) {
          var path = "team/" + id;
          return privateClient.getObject(path);
        },
        findAll: function(){
          return privateClient.getAll("team/");
        }
  };

  var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ID_LENGTH = 5;

  var generateUID = function() {
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }

  var findById = function(collection, id){
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].id === id) {
        return collection[i];
      }
    }
    return null;
  }

    // Return and export public functions
   return { exports: teams };

});

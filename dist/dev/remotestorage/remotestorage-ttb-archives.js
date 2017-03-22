RemoteStorage.defineModule("archives", function (privateClient, publicClient) {

  privateClient.cache('', 'ALL');
  privateClient.declareType('archive', {
    "type": "object",
    "description":"archives"
  });

  var upgrade = function(client){
    return client.getAll("archive/").then(function(archives){

      var toStore = [];
      var toDelete = [];
      for (var archiveId in archives) {
        toStore.push(client.storeObject('',archiveId,archives[archiveId]));
        toDelete.push(client.remove('archive/' + archiveId));
      }
      toDelete.push(client.remove('archive/'));
      if (toStore.length==0) return false;
      return Promise.all(toStore).then(function() {
          console.log("items moved from archives/archive/ to archives/");
          return Promise.all(toStore).then(function() {
            console.log('items removed at archives/archive/*');
            return true;
          }).catch(function(e) {
            console.log('oups...' + e);
            return false;
          })
      })
      .catch(function(e) {
          console.log('oups...' + e);
          return false;
      });

    });
  }

  var archives = {

      upgrade: function() {
        return upgrade(privateClient);
      },
      store: function(archive) {
        if (!archive.id){
          archive.id = generateUID();
        }

        return privateClient.storeObject("archive", archive.id, archive).
          then(function() {
            return archive;
          });
      },

      remove: function(archiveId){
        return privateClient.remove(archiveId);
      },
      find: function(id) {
        return privateClient.getObject(id);
      },
      findAll: function(){
        return privateClient.getAll("");
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
   return { exports: archives };

});

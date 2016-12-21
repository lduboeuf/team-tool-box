RemoteStorage.defineModule("archives", function (privateClient, publicClient) {

  privateClient.cache('', 'ALL');
  privateClient.declareType('archive', {
    "type": "object",
    "description":"archives"
  });

  var archives = {

        store: function(archive) {
          if (!archive.id){
            archive.id = generateUID();
          }
          var path = "archive/" + archive.id;
          return privateClient.storeObject("archive", path, archive).
            then(function() {
              return archive;
            });
        },

        remove: function(archiveId){
          return privateClient.remove('archive/' + archiveId);
        },
        find: function(id) {
          var path = "archive/" + id;
          return privateClient.getObject(path);
        },
        findAll: function(){
          return privateClient.getAll("archive/");
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

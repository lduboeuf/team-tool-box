//TODO object in memory
(function(window){

    var storage = {name:'ttb-archive', fields: ['archives','teams','members', 'name','id','description']};
    //localStorage.clear();
    var Archives = fetch(storage.name) || {  archives: [] };

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
        var str = JSON.stringify(Archives, storage.fields);
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



    function ArchiveRepository(){}

    ArchiveRepository.export = function(){
      return localStorage.getItem(storage.name);
    }

    ArchiveRepository.import =function(str){
      localStorage.setItem(storage.name, str);
      Archives = fetch(storage.name)
    }

    ArchiveRepository.findAll = function(){
      return Archives.archives;
    }

    ArchiveRepository.findById = function(id){
      return findById(Archives.archives, id);
    }


    ArchiveRepository.remove = function(archiveId){
      for (var i=0; i < Archives.archives.length; i++){
        var archive = Archives.archives[i];
        if (archive.id === archiveId){
            Archives.archives.splice(i, 1);
            break;
        }
      }

      store();
    }

    ArchiveRepository.add = function(archive){
      archive.id = generateUID();
      Archives.archives.push(archive);
      store();
    }


    window.ArchiveRepository = ArchiveRepository;


})(this);

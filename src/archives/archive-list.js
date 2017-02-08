app.page("archive-list", function()
{

  var $archiveList = document.querySelector('#archive-list .archive-list');
  var tpl = doT.template($archiveList.innerHTML);

  $archiveList.innerHTML=null;


  return function(params) {

    remoteStorage.archives.findAll().then(
      function(archives){
        if (Object.keys(archives).length > 0){
          $archiveList.innerHTML = tpl(archives);
        }else{
          $archiveList.innerHTML = null;
          app.alert('alert-info','no archives found, random generated teams when saved will be displayed here.');

        }

      }
    );



  }
});

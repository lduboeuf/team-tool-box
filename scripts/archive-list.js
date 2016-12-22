app.page("archive-list", function()
{

  var $archiveList = document.querySelector('#archive-list .archive-list');
  var tpl = doT.template($archiveList.innerHTML);

  $archiveList.innerHTML=null;


  return function(params) {

    remoteStorage.archives.findAll().then(
      function(archives){
        $archiveList.innerHTML = tpl(archives);
      }
    );
    


  }
});

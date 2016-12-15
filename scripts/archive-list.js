app.page("archive-list", function()
{

  var $archiveList = document.querySelector('#archive-list .archive-list');
  var tpl = doT.template($archiveList.innerHTML);

  $archiveList.innerHTML=null;


  return function(params) {

    var archives = TeamRepository.findArchives();
    $archiveList.innerHTML = tpl(archives);

  }
});

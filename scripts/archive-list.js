app.page("archive-list", function()
{

  var $archiveList = document.querySelector('#archive-list .archive-list');

  var tpl= $archiveList.innerHTML;

  $archiveList.innerHTML=null;


  return function(params) {

    var archives = TeamRepository.findArchives();
    var output = mustache(tpl, { archives: archives} );
    $archiveList.innerHTML = output;
    
  }
});

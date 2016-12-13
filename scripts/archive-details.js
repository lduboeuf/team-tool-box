app.page("archive-details", function()
{

  var $section = document.getElementById('archive-details');
  var tpl= $section.innerHTML;

  var currentArchiveId = null;

  //default is not shown
  $section.innerHTML=null;

  var remove = function(){
    if (confirm('sure you want to remove this archive ?')){
      TeamRepository.removeArchive(currentArchiveId);
      history.back();
    }
    return false;
  }


  return function(params) {
    currentArchiveId = parseInt(params);
    var archive = TeamRepository.findArchive(currentArchiveId);
    var output = mustache(tpl,  archive );
    $section.innerHTML = output;

    $section.querySelector('.remove-link').onclick=remove;

  }
});

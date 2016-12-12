app.page("archive-details", function()
{

  var o = document.getElementById('archive-details');
  var tpl= o.innerHTML;

  //default is not shown
  o.innerHTML=null;


  return function(params) {
    var archiveId = parseInt(params);
    var archive = TeamRepository.findArchive(archiveId);
    var output = mustache(tpl,  archive );
    o.innerHTML = output;

  }
});
